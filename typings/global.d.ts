declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production',
    readonly PORT: string
  }
}

interface Window {
  /** 关闭预加载动画 */
  removeLoading: () => void,
  // 渲染进程通讯
  ipcRenderer: any,
  JsMediaDevices: any,
  mediaDevices: any,
  registration: {
    getDocumentScannerList: any,
    getDocumentScannerStream: any,
    getDocumentScannerCapture: any,
    getCaptureImg: any
  }
}
