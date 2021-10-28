/**
 * electron 主文件
 */
import '@src/common/patch'
import { join } from 'path'
import { app, BrowserWindow } from 'electron'
import './config'

let win: BrowserWindow

function createWin() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    useContentSize: true,
    frame: true, // 显示标题栏
    center: true,
    focusable: true,
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
      preload: join(__dirname, '../../src/preload/index.js'),
      nativeWindowOpen: true,
      webviewTag: true
    }
  })
  const URL = app.isPackaged
    ? `file://${join(__dirname, '../render/index.html')}` // vite 构建后的静态文件地址
    : `http://localhost:${process.env.PORT}` // vite 启动的服务器地址

  win?.loadURL(URL)

  // @ts-ignore
  if (process.env.NODE_ENV === 'development') win.openDevTools()

  win.setMenu(null)
}

app.whenReady().then(createWin)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWin()
  }
})
