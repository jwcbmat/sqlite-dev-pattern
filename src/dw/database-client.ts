import sqlite3 from "sqlite3"
import * as sqlite from "sqlite"
import { tmpdir } from "os"
import path from "node:path"
import { readFile } from "fs/promises"

import statments, { statment } from "./statments/statments"

const _CURRENT_VERSION = "1.0.0"

class DatabaseClient {
    private _db! : sqlite.Database
    private _statmentsMap = new Map<keyof typeof statments, sqlite.Statement>()
    private readonly _pathTmp = tmpdir()

    /** init database */
    public async init() {
       this._db = await sqlite.open({
            filename: `${this._pathTmp}/database.db`, // can be used: :memory:
            driver: sqlite3.Database
        })

        await this._createTables()
        await this._prepareStatments()
    }

    /** create tables if not exists */
    private async _createTables() {
        if (!this._db) throw new Error("Database not found!")

        // TODO: build a database configuration table, storing version information
        const templateDatabase = path.resolve(
            process.cwd(),
            `src/dw/migrate/${_CURRENT_VERSION}.sql`
        )

        const data = await readFile(templateDatabase, { encoding: "utf-8"})

        await this._db.exec(data)
    }
    
    /** prepare statments to performance query */
    private async _prepareStatments() {
        if (!this._db) throw new Error("Database not found!")

        for (const key in  statments) {
            const element = statments[key as keyof typeof statments]
            const _key = key as keyof typeof statments
            this._statmentsMap.set(_key, await this._db.prepare(element))
        }
    }
}

/** export singleton class */
export default new DatabaseClient()
