window.spellCheckEnabled = true;

const SpellCheckHandler = require("electron-spellchecker/lib/spell-check-handler").default;
const ContextMenuListener = require("electron-spellchecker/lib/context-menu-listener").default;
const ContextMenuBuilder = require("electron-spellchecker/lib/context-menu-builder").default;

window.spellCheckHandler = new SpellCheckHandler();
setTimeout(() => window.spellCheckHandler.attachToInput(), 1000);

window.spellCheckHandler.provideHintText("This is probably the language that you want to check in");
window.spellCheckHandler.autoUnloadDictionariesOnBlur();

window.contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler, null, true);
window.contextMenuListener = new ContextMenuListener((info) => {
    window.contextMenuBuilder.showPopupMenu(info);
});
