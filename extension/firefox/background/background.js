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
// Firefox
const URL_INSTALL = "../options/config.html"; const URL_UPDATE = "../update.html"; 
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
const MESSAGE = "desativado";

browser.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.message == MESSAGE) {
    setNotifications(7, 7000, "notificationTitleOffPausar", "notificationContentOffPausar");
  }
});

function setNotifications(setId, setTime, setTitle, setContent) {
  const id = `ID_Notifications_[${setId}]`;
  const tempo = setTime;
  const title = browser.i18n.getMessage(setTitle);
  const content = browser.i18n.getMessage(setContent); 
  const options = {
    type: 'basic',
    iconUrl: browser.extension.getURL("./src/relogio-icon-48x48.png"),
    title: title,
    message: content,
    eventTime: Date.now(),
    isClickable: false,
    priority: 1
  };
  const createCallback = function(notificationId) { console.log(notificationId); };
  browser.notifications.create(id, options, createCallback); // returns 'ID_Notifications';
  setTimeout(() => {
    const clearCallback = function(notificationCleared) { console.log(notificationCleared); };
    browser.notifications.clear(id, clearCallback); // returns true;
  }, tempo);
}
