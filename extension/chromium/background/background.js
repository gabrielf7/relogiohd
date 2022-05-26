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
  } else if(details.reason === "update") {
    chrome.tabs.create({
      url: URL_UPDATE
    });
  }
});
// --------------------------------------------------------------------------
const MESSAGE = "desativado";

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  let id = chrome.runtime.id;
  if (request.message == MESSAGE) {
    chrome.management.setEnabled(id, false); 
  }
});
