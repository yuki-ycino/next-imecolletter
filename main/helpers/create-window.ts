import { screen, BrowserWindow, Rectangle } from "electron"
import Store from "electron-store"

type DefaultWindowState = {
  x?: number
  y?: number
  width: number
  height: number
}

type WindowState = {
  x: number
  y: number
  width: number
  height: number
}

let win: BrowserWindow | undefined

const getCurrentPosition = (): WindowState => {
  const position = win ? win.getPosition() : [NaN, NaN]
  const size = win ? win.getSize() : [NaN, NaN]
  return {
    x: position[0],
    y: position[1],
    width: size[0],
    height: size[1]
  }
}

const windowWithinBounds = (windowState: WindowState, bounds: Rectangle): boolean => {
  return (
    windowState.x >= bounds.x &&
    windowState.y >= bounds.y &&
    windowState.x + windowState.width <= bounds.x + bounds.width &&
    windowState.y + windowState.height <= bounds.y + bounds.height
  )
}

const resetToDefaults = (defaultState: WindowState): WindowState => {
  const bounds = screen.getPrimaryDisplay().bounds
  return {
    ...defaultState,
    x: (bounds.width - defaultState.width) / 2,
    y: (bounds.height - defaultState.height) / 2
  }
}

const ensureVisibleOnSomeDisplay = (windowState: WindowState, defaultState: WindowState): WindowState => {
  const visible = screen.getAllDisplays().some((display): boolean => {
    return windowWithinBounds(windowState, display.bounds)
  })

  return visible ? windowState : resetToDefaults(defaultState)
}

export default (windowName: string, options: DefaultWindowState): BrowserWindow => {
  const key = "window-state"
  const name = `window-state-${windowName}`
  const store = new Store<WindowState>({ name })
  const defaultState: WindowState = {
    x: options.x || NaN,
    y: options.y || NaN,
    width: options.width,
    height: options.height
  }

  const windowState = store.get(key, defaultState)
  const state = ensureVisibleOnSomeDisplay(windowState, defaultState)

  const browserOptions = {
    ...options,
    ...state,
    webPreferences: {
      nodeIntegration: true
    }
  }

  win = new BrowserWindow(browserOptions)

  const saveState = (): void => {
    const newState = win && !win.isMinimized() && !win.isMaximized() ? { ...state, ...getCurrentPosition() } : state
    store.set(key, newState)
  }
  win.on("close", saveState)

  return win
}
