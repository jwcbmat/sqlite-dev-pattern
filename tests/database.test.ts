import {
    jest,
    describe,
    it,
    expect,
    beforeEach
} from "@jest/globals";
import DatabaseClient from "../src/dw/database-client"
import * as sqlite from "sqlite"
import fs from "fs/promises"

describe("Database test suite", () => {
    let _database: typeof DatabaseClient
    jest.spyOn(fs, "readFile").mockResolvedValue("/tmp/mockDatabase.db")

    beforeEach(() => {
        _database = DatabaseClient
    })

    it("check if database client class is a singleton", () => {
        const _database2 = DatabaseClient
        expect(_database).toBe(_database2)
    })

    describe("#init", () => {
        jest.spyOn(sqlite, "open").mockResolvedValue({ exec: jest.fn() } as any)

        it("should be init database", async () => {
            await _database.init()

            expect(sqlite.open).toHaveBeenCalled()
        })

        it("in init method, must be called private _createTables method", async () => {
            const spy = jest.spyOn(_database as any, "_createTables")
            await _database.init()
            expect(spy).toHaveBeenCalled()
        })
    })
})