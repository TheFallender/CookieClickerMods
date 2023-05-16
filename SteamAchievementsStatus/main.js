//CCSE Load
if (SteamAchievementsEnabled === undefined)
	var SteamAchievementsEnabled = {
		//Mod Data
		modData: {
			id: "SteamAchievementsStatus",
			name: "Steam Achievements Status",
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
			forceEnable: 0,
		},
		defaultSettings: {
			forceEnable: 0,
		},

		//Settings Names
		settingsNames: [],
		setVariableNames: function() {
			Object.entries(SteamAchievementsEnabled.settings).forEach(
				element => {
					SteamAchievementsEnabled.settingsNames.push(
						Object.values(element)[0]
					);
				}
			)
		},

		//Actions
		actions: {
			forceEnable: {
				action: function() {
					Steam.allowSteamAchievs = true;
					Game.UpdateMenu();
				},
			},
		},
		setDelayTimers: function(key) {
			SteamAchievementsEnabled.actions[key].delayTimer = setInterval(
				SteamAchievementsEnabled.actions[key].action,
				SteamAchievementsEnabled.actions[key].delay
			)
		},

		//Menu data
		getMenuData: function() {
			return '' +
			'<div class="listing">' +
				CCSE.MenuHelper.ToggleButton(
					SteamAchievementsEnabled.settings,
					SteamAchievementsEnabled.settingsNames[0],
					SteamAchievementsEnabled.modData.id + "_" + SteamAchievementsEnabled.settingsNames[0],
					'Force Enable Achievements Enabled', 'Force Enable Achievements Disabled', "SteamAchievementsEnabled.toggleButtonCallback"
				) +
			'</div>' +
				'<div class="listing">' +
				`<label>Steam Achievement Status: ${Steam.allowSteamAchievs ? "Enabled" : "Disabled"}</label>` +
			'</div>';
		},

		//Method to restore and save
		restoreDefaultConfig: function(){
			SteamAchievementsEnabled.config = SteamAchievementsEnabled.defaultSettings;
		},

		//Toggle Button (in settings menu) callback
		toggleButtonCallback: function (prefName, button, on, off, invert) {
			if (SteamAchievementsEnabled.settings[prefName]) {
				l(button).innerHTML = off;
				SteamAchievementsEnabled.settings[prefName] = 0;
			}
			else {
				l(button).innerHTML = on;
				SteamAchievementsEnabled.settings[prefName] = 1;
			}
			l(button).className = 'option' + ((SteamAchievementsEnabled.settings[prefName] ^ invert) ? '' : ' off');
			SteamAchievementsEnabled.onSettingsChanged();
		},

		//Check Config
		checkConfig: function () {
			for (const [key, value] of Object.entries(SteamAchievementsEnabled.defaultSettings)) {
				if (SteamAchievementsEnabled.settings[key] == undefined) {
					SteamAchievementsEnabled.settings[key] = value;
				}
			}
		},

		//Change in settings
		onSettingsChanged: function () {
			for (const [key, settingEnabled] of Object.entries(SteamAchievementsEnabled.settings)) {
				if (SteamAchievementsEnabled.actions[key] == undefined) {
					continue;
				}
				if (settingEnabled) {
					if (SteamAchievementsEnabled.actions[key].delayTimer == undefined && SteamAchievementsEnabled.actions[key].delayTimer !== null) {
						SteamAchievementsEnabled.actions[key].action();
					} else {
						clearInterval(SteamAchievementsEnabled.actions[key].delayTimer);
						SteamAchievementsEnabled.actions[key].delayTimer = null;
						SteamAchievementsEnabled.setDelayTimers(key);
					}
				} else if (SteamAchievementsEnabled.actions[key].delayTimer != null) {
					clearInterval(SteamAchievementsEnabled.actions[key].delayTimer);
					SteamAchievementsEnabled.actions[key].delayTimer = null;
				}
			}
		}
	};
if (typeof CCSE == 'undefined')
	Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

//Mod presets
SteamAchievementsEnabled.launch = function() {
	SteamAchievementsEnabled.init = function () {
		SteamAchievementsEnabled.restoreDefaultConfig();
		SteamAchievementsEnabled.setVariableNames();

		Game.customOptionsMenu.push(function () {
			CCSE.AppendCollapsibleOptionsMenu(SteamAchievementsEnabled.modData.name, SteamAchievementsEnabled.getMenuData());
		});
	
		Game.customStatsMenu.push(function () {
			CCSE.AppendStatsVersionNumber(SteamAchievementsEnabled.modData.name, SteamAchievementsEnabled.modData.version);
		});

		SteamAchievementsEnabled.variables.isLoaded = 1;
	}

	SteamAchievementsEnabled.save = function() {
		return JSON.stringify(SteamAchievementsEnabled.settings);
	}

	SteamAchievementsEnabled.load = function (data) {
		if (!SteamAchievementsEnabled.variables.dataLoaded) {
			SteamAchievementsEnabled.variables.dataLoaded = 1;
			SteamAchievementsEnabled.settings = JSON.parse(data);
			SteamAchievementsEnabled.checkConfig();
			SteamAchievementsEnabled.onSettingsChanged();
		}
	}

	if (CCSE.ConfirmGameVersion(
		SteamAchievementsEnabled.modData.id,
		SteamAchievementsEnabled.modData.version,
		SteamAchievementsEnabled.modData.gameVer
	)) {
		Game.registerMod(
			SteamAchievementsEnabled.modData.id,
			SteamAchievementsEnabled
		);
	}
}

//CCSE Hook wait
if (!SteamAchievementsEnabled.variables.isLoaded) {
	if (CCSE && CCSE.isLoaded) {
		SteamAchievementsEnabled.launch();
	} else {
		if (!CCSE)
			var CCSE = {};
		if (!CCSE.postLoadHooks)
			CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(SteamAchievementsEnabled.launch);
	}
}