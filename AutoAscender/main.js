//CCSE Load
if (AutoAscender === undefined)
	var AutoAscender = {
		//Mod Data
		modData: {
			id: "AutoAscender",
			name: "Auto Ascender",
			version: "1.1",
			gameVer: '2.052'
		},

		//Variables of the mod
		variables: {
			dataLoaded: 0,
			isLoaded: 0,
		},

		//Settings
		settings: {
			autoAscend: 0,
		},
		defaultSettings: {
			autoAscend: 0,
		},

		//Settings Names
		settingsNames: [],
		setVariableNames: function() {
			Object.entries(AutoAscender.settings).forEach(
				element => {
					AutoAscender.settingsNames.push(
						Object.values(element)[0]
					);
				}
			)
		},

		//Actions
		actions: {
			autoAscend: {
				variables: {
					cooldownEnabled: false,
					ascendAnimationWait: 6000,
				},
				delay: 500,
				action: function() {
					if (Game.ascendMeterLevel > 0 && !AutoAscender.actions.autoAscend.variables.cooldownEnabled) {
						AutoAscender.actions.autoAscend.variables.cooldownEnabled = true;
						Game.Ascend(true);
						setTimeout(
							() => {
								Game.Reincarnate(true);
								AutoAscender.actions.autoAscend.variables.cooldownEnabled = false;
							},
							AutoAscender.actions.autoAscend.variables.ascendAnimationWait
						);
					}
				},
				delayTimer: null,
			},
		},
		setDelayTimers: function(key) {
			AutoAscender.actions[key].delayTimer = setInterval(
				AutoAscender.actions[key].action,
				AutoAscender.actions[key].delay
			)
		},

		//Menu data
		getMenuData: function() {
			return '' +
			'<div class="listing">' +
				CCSE.MenuHelper.ToggleButton(
					AutoAscender.settings,
					AutoAscender.settingsNames[0],
					AutoAscender.modData.id + "_" + AutoAscender.settingsNames[0],
					'Auto Ascend Enabled', 'Auto Ascend Disabled', "AutoAscender.toggleButtonCallback"
				) +
			'</div>';
		},

		//Method to restore and save
		restoreDefaultConfig: function(){
			AutoAscender.config = AutoAscender.defaultSettings;
		},

		//Toggle Button (in settings menu) callback
		toggleButtonCallback: function (prefName, button, on, off, invert) {
			if (AutoAscender.settings[prefName]) {
				l(button).innerHTML = off;
				AutoAscender.settings[prefName] = 0;
			}
			else {
				l(button).innerHTML = on;
				AutoAscender.settings[prefName] = 1;
			}
			l(button).className = 'option' + ((AutoAscender.settings[prefName] ^ invert) ? '' : ' off');
			AutoAscender.onSettingsChanged();
		},

		//Check Config
		checkConfig: function () {
			for (const [key, value] of Object.entries(AutoAscender.defaultSettings)) {
				if (AutoAscender.settings[key] == undefined) {
					AutoAscender.settings[key] = value;
				}
			}
		},

		//Change in settings
		onSettingsChanged: function () {
			for (const [key, settingEnabled] of Object.entries(AutoAscender.settings)) {
				if (AutoAscender.actions[key] == undefined) {
					continue;
				}
				if (settingEnabled) {
					if (AutoAscender.actions[key].delayTimer == undefined && AutoAscender.actions[key].delayTimer !== null) {
						AutoAscender.actions[key].action();
					} else {
						clearInterval(AutoAscender.actions[key].delayTimer);
						AutoAscender.actions[key].delayTimer = null;
						AutoAscender.setDelayTimers(key);
					}
				} else if (AutoAscender.actions[key].delayTimer != null) {
					clearInterval(AutoAscender.actions[key].delayTimer);
					AutoAscender.actions[key].delayTimer = null;
				}
			}
		}
	};
if (typeof CCSE == 'undefined')
	Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

//Mod presets
AutoAscender.launch = function() {
	AutoAscender.init = function () {
		AutoAscender.restoreDefaultConfig();
		AutoAscender.setVariableNames();

		Game.customOptionsMenu.push(function () {
			CCSE.AppendCollapsibleOptionsMenu(AutoAscender.modData.name, AutoAscender.getMenuData());
		});
	
		Game.customStatsMenu.push(function () {
			CCSE.AppendStatsVersionNumber(AutoAscender.modData.name, AutoAscender.modData.version);
		});

		AutoAscender.variables.isLoaded = 1;
	}

	AutoAscender.save = function() {
		return JSON.stringify(AutoAscender.settings);
	}

	AutoAscender.load = function (data) {
		if (!AutoAscender.variables.dataLoaded) {
			AutoAscender.variables.dataLoaded = 1;
			AutoAscender.settings = JSON.parse(data);
			AutoAscender.checkConfig();
			AutoAscender.onSettingsChanged();
		}
	}

	if (CCSE.ConfirmGameVersion(
		AutoAscender.modData.id,
		AutoAscender.modData.version,
		AutoAscender.modData.gameVer
	)) {
		Game.registerMod(
			AutoAscender.modData.id,
			AutoAscender
		);
	}
}

//CCSE Hook wait
if (!AutoAscender.variables.isLoaded) {
	if (CCSE && CCSE.isLoaded) {
		AutoAscender.launch();
	} else {
		if (!CCSE)
			var CCSE = {};
		if (!CCSE.postLoadHooks)
			CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(AutoAscender.launch);
	}
}

