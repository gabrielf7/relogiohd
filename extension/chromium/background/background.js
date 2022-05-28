// --------------------------------------------------------------------------
// [Instalação | Atualizar | Desinstalar]
// --------------------------------------------------------------------------
// [Instalação] details.reason == "install" => Chamar uma função para lidar com uma primeira instalação 
// [Atualizar] details.reason == "update" => Chamar uma função para lidar com uma atualização
// [Desinstalar] chrome.runtime.setUninstallURL(url, callback)
// const URL_UNINSTALL = "";
// if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
//   chrome.runtime.setUninstallURL(URL_UNINSTALL);
// }
// [Executar]
// chromium
const URL_INSTALL = "./extension/chromium/options/config.html"; const URL_UPDATE = "./extension/chromium/update.html"; 
chrome.runtime.onInstalled.addListener((details=Object) => {
  if(details.reason === "install"){ 
    chrome.tabs.create({
      url: URL_INSTALL
    });
    setNotifications(1, 5000, "notificationTitleInstall", "notificationContentInstall");
  } else if(details.reason === "update") {
    chrome.tabs.create({
      url: URL_UPDATE
    });
  }
});
// --------------------------------------------------------------------------

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  const MESSAGE = "desativado";
  const STATUS_MESSAGE = "Extensão Pausada";
  if (request.message == MESSAGE) {
    const id = chrome.runtime.id;
    const tempo = 7000;
    setNotifications(7, tempo, "notificationTitleOnPausar", "notificationContentOnPausar");
    setTimeout(() => {
      chrome.management.setEnabled(id, false); 
    }, tempo);
  }
  sendResponse({ status: STATUS_MESSAGE });
  return true; 
});

function setNotifications(setId, setTime, setTitle, setContent) {
  const id = `ID_Notifications_[${setId}]`;
  const tempo = setTime;
  const title = chrome.i18n.getMessage(setTitle);
  const content = chrome.i18n.getMessage(setContent); 
  const options = {
    type: 'basic',
    iconUrl: chrome.runtime.getURL("./src/relogio-icon-48x48.png"),
    title: title,
    message: content,
    eventTime: Date.now(),
    isClickable: false,
    priority: 1
  };
  const createCallback = function(notificationId) { console.log(notificationId); };
  chrome.notifications.create(id, options, createCallback); // returns 'ID_Notifications';
  setTimeout(() => {
    const clearCallback = function(notificationCleared) { console.log(notificationCleared); };
    chrome.notifications.clear(id, clearCallback); // returns true;
  }, tempo);
}
