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
    let id = browser.runtime.id;
    browser.management.setEnabled(id, false); 
  }
});
