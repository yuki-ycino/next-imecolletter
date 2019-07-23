import { watch } from "fs"
import { join } from "path"
import { app } from "electron"

const exitOnChange = (): void => {
  watch(join(process.cwd(), "app/background.js"), (): void => {
    app.exit(0)
  })
}

export default exitOnChange
