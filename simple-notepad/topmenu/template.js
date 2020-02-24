const { shell } = require("electron");
const { refreshText, openText, saveText, saveAsText } = require("./controller");

const menu = [
{
	label: "파일",
	submenu: [
	{
		label: "새로 만들기",
		accelerator: "CmdOrCtrl+N",
		click() {
			refreshText();
		}
	},
	{
		label: "열기",
		accelerator: "CmdOrCtrl+O",
		click() {
			openText();
		}
	},
	{
		label: "저장",
    	accelerator: "CmdOrCtrl+S",
    	click() {
    		saveText();
    	}
	},
	{
		label: "다른 이름으로 저장",
    	accelerator: "CmdOrCtrl+Shift+S",
    	click() {
    		saveAsText();
    	}
	},
	{ type: "separator" },
	{
		label: "끝내기",
		role: "close"
	}
    ]
},
{
	label: "편집",
	submenu: [
	{
		label: "실행 취소",
		role: "undo"
	},
	{ type: "separator" },
	{
		label: "잘라내기",
		role: "cut"
	},
	{
		label: "복사",
		role: "copy"
	},
	{
		label: "붙여넣기",
		role: "paste"
	},
	{
		label: "삭제",
		role: "delete",
		accelerator: "Delete",
	},
	{ type: "separator" },
	{
		label: "모두 선택",
		role: "selectall"
	}
	]
},
{
	label: "보기",
    submenu: [
	{
    	label: "확대",
    	role: "zoomin"
    },
    {
    	label: "축소",
    	role: "zoomout"
    },
    {
    	label: "원래대로",
		role: "resetzoom"
	},
	{ type: "separator" },
	{
    	label: "전체/기본화면",
    	role: "togglefullscreen"
	},
    {
		label: "최소화",
		role: "Minimize"
	}
    ]
},
{
	label: "도움말",
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