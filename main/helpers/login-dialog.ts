import { BrowserWindow, Event } from "electron"
import auth from "oauth-electron-twitter"

export default async (event: Event): Promise<void> => {
  const keys = {
    key: process.env.TWITTER_API_KEY,
    secret: process.env.TWITTER_API_SECRET
  }

  const authWindow = new BrowserWindow({ webPreferences: { nodeIntegration: false } })

  try {
    const result = await auth.login(keys, authWindow)
    event.sender.send("login-success", result.token, result.tokenSecret)
  } catch (error) {
    console.error(error)
  }

  authWindow.close()
}
