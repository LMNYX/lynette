// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    onChatMessage: (callback) => ipcRenderer.on('onChatMessage', (_event, value) => callback(value)),
    on7TVEmotesLoaded: (callback) => ipcRenderer.on('on7TVEmotesLoaded', (_event, value) => callback(value))
})