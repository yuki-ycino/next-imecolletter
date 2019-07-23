import { app, ipcMain, Event } from "electron"
import serve from "electron-serve"
import { createWindow, exitOnChange, loginDialog } from "./helpers"

const isProd = process.env.NODE_ENV === "production"

if (isProd) {
  serve({ directory: "app" })
} else {
  exitOnChange()

  const userDataPath = app.getPath("userData")
  app.setPath("userData", `${userDataPath} (development)`)
}

;(async (): Promise<void> => {
  await app.whenReady()
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600
  })

  if (isProd) {
    await mainWindow.loadURL("app://./home.html")
  } else {
    const homeUrl = "http://localhost:8888/home"
    await mainWindow.loadURL(homeUrl)
    mainWindow.webContents.openDevTools()
  }
})()

app.on("window-all-closed", (): void => {
  app.quit()
})

ipcMain.on("login-dialog", (e: Event): void => {
  loginDialog(e)
})
