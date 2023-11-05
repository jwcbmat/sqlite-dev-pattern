import DatabaseClient from "./dw/database-client"

if (process.env.NODE_ENV === "development")
    console.log(`${new Date().toISOString()} - [INFO]: Running entrypoint...`)

function entryPoint() {

    /** init sqlite database */
   DatabaseClient.init()
       .then(() => {
           if (process.env.NODE_ENV === "development")
               console.log(`${new Date().toISOString()} - [INFO]: Database started with success.`)
       })
}

entryPoint()