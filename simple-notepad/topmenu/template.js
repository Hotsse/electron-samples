const { shell } = require("electron");
const { refreshText, openText, saveText, saveAsText } = require("./controller");

const menu = [
{
	label: "Edit",
	submenu: [
	{
		label: "New",
		accelerator: "CmdOrCtrl+N",
		click() {
			refreshText();
		}
	},
	{
		label: "Oepn",
		accelerator: "CmdOrCtrl+O",
		click() {
			openText();
		}
	},
	{
		label: "Save",
    	accelerator: "CmdOrCtrl+S",
    	click() {
    		saveText();
    	}
	},
	{
		label: "Save As",
    	accelerator: "CmdOrCtrl+Shift+S",
    	click() {
    		saveAsText();
    	}
	},
	
	{ role: "undo" },
    { role: "redo" },
    { type: "separator" },
    { role: "cut" },
    { role: "copy" },
    { role: "paste" },
    { role: "pasteandmatchstyle" },
    { role: "delete" },
    { role: "selectall" }
    ]
},
{
	label: "View",
    submenu: [
	{
    	label: "Larger",
    	role: "zoomin"
    },
    {
    	label: "Smaller",
    	role: "zoomout"
    },
    {
    	label: "Reset size",
		role: "resetzoom"
    },
    { type: "separator" }
    ]
},
{
	role: "window",
	submenu: [
	{
    	lebel: "Full/Small",
    	role: "togglefullscreen"
	},
    { role: "Minimize" },
    { role: "close" }
    ]
},
{
	role: "help",
	submenu: [
	{
    	label: "Learn More",
    	click() {
    		shell.openExternal("https://github.com/Hotsse/electron-samples");
    	}
	}
    ]
}
];

module.exports = menu;