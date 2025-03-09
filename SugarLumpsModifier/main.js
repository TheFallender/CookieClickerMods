//CCSE Load
if (SugarLumpsMod === undefined) {
	var SugarLumpsMod = {
		//Mod Data
		modData: {
			id: "SugarLumpsModifier",
			name: "Sugar Lumps Modifier",
			version: "1.2",
			gameVer: '2.053'
		},

		//Variables of the mod
		variables: {
			dataLoaded: 0,
			isLoaded: 0,
			lumpTypes: {
				0: "Normal",
				1: "Bifurcated",
				2: "Golden",
				3: "Meaty",
				4: "Caramelized",
			}
		},

		//Settings
		settings: {
			//Mod enabled
			modEnabled: 0,
			backgroundLumps: 0,
			showLumpType: 0,

			//Actions
			changeCheck: 1,

			//Lump Load Settings
			previousLumps: -1,
			previousLumpT: -1,

			//Age Settings

			//-------Mature Age Settings-------
			matureAgeHours: 0,
			matureAgeMinutes: 0,
			matureAgeSeconds: 0,

			//--------Ripe Age Settings--------
			ripeAgeHours: 0,
			ripeAgeMinutes: 0,
			ripeAgeSeconds: 0,

			//------OverRipe Age Settings------
			overRipeAgeHours: 0,
			overRipeAgeMinutes: 0,
			overRipeAgeSeconds: 0,
			overRipeAgeSeconds: 0,
		},
		defaultSettings: {
			//Mod enabled
			modEnabled: 0,
			backgroundLumps: 0,
			showLumpType: 0,

			//Actions
			changeCheck: 1,

			//Lump Load Settings
			previousLumps: -1,
			previousLumpT: -1,

			//Age Settings

			//-------Mature Age Settings-------
			matureAgeHours: 0,
			matureAgeMinutes: 0,
			matureAgeSeconds: 0,

			//--------Ripe Age Settings--------
			ripeAgeHours: 0,
			ripeAgeMinutes: 0,
			ripeAgeSeconds: 0,

			//------OverRipe Age Settings------
			overRipeAgeHours: 0,
			overRipeAgeMinutes: 0,
			overRipeAgeSeconds: 0,
		},

		//Actions
		actions: {
			changeCheck : {
				variables: {
					oldComputeLumpTimes: null,
				},
				action: function() {
					if (SugarLumpsMod.settings.modEnabled) {
						//New compute lump times function with the setted times
						Game.computeLumpTimes = function() {
							Game.lumpMatureAge = SugarLumpsMod.actions.changeCheck.calculateMsTime(
								SugarLumpsMod.settings.matureAgeHours,
								SugarLumpsMod.settings.matureAgeMinutes,
								SugarLumpsMod.settings.matureAgeSeconds
							);
							Game.lumpRipeAge = SugarLumpsMod.actions.changeCheck.calculateMsTime(
								SugarLumpsMod.settings.ripeAgeHours,
								SugarLumpsMod.settings.ripeAgeMinutes,
								SugarLumpsMod.settings.ripeAgeSeconds
							);
							Game.lumpOverripeAge = SugarLumpsMod.actions.changeCheck.calculateMsTime(
								SugarLumpsMod.settings.overRipeAgeHours,
								SugarLumpsMod.settings.overRipeAgeMinutes,
								SugarLumpsMod.settings.overRipeAgeSeconds
							);
						}
					} else {
						//Restore the old compute lump times function
						Game.computeLumpTimes = SugarLumpsMod.actions.changeCheck.variables.oldComputeLumpTimes;
					}

					//Calculate new lump times
					Game.computeLumpTimes();
				},
				//Function to translate the inputted time to milliseconds
				calculateMsTime : function(timeHours, timeMinutes, timeSeconds) {
					var result = 0;
					result += timeHours * 1000 * 60 * 60;
					result += timeMinutes * 1000 * 60;
					result += timeSeconds * 1000;
					return result;
				}
			},
		},
		setDelayTimers: function(key) {
			SugarLumpsMod.actions[key].delayTimer = setInterval(
				SugarLumpsMod.actions[key].action,
				SugarLumpsMod.actions[key].delay
			)
		},

		//Menu data
		getMenuData: function() {
			return '' +
			'<div class="listing">' +
				CCSE.MenuHelper.ToggleButton(
					SugarLumpsMod.settings,
					"modEnabled",
					SugarLumpsMod.modData.id + "_" + "modEnabled",
					'Sugar Lump Modifier Enabled', 'Sugar Lump Modifier Disabled', "SugarLumpsMod.toggleButtonCallback"
				) +
			'</div>' +
			'<div class="listing">' +
				CCSE.MenuHelper.ToggleButton(
					SugarLumpsMod.settings,
					"backgroundLumps",
					SugarLumpsMod.modData.id + "_" + "backgroundLumps",
					'Background Lumps Enabled', 'Background Lumps Disabled', "SugarLumpsMod.toggleButtonCallback"
				) +
				'<label> This will enable getting the correct lump rate while the game is closed.</label>' +
			'</div>' +
			'<div class="listing">' +
				'<label>All formats are in (hh:mm:ss)</label>' +
			'</div>' +
			'<div class="listing">' +
				'<label>Mature Age Time:</label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "matureAgeHours",
					15,
					SugarLumpsMod.settings.matureAgeHours,
					"SugarLumpsMod.inputChanged('matureAgeHours', this.value)"
				) + '<label> : </label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "matureAgeMinutes",
					15,
					SugarLumpsMod.settings.matureAgeMinutes,
					"SugarLumpsMod.inputChanged('matureAgeMinutes', this.value)"
				) + '<label> : </label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "matureAgeSeconds",
					15,
					SugarLumpsMod.settings.matureAgeSeconds,
					"SugarLumpsMod.inputChanged('matureAgeSeconds', this.value)"
				) +
			'</div>' +
			'<div class="listing">' +
				'<label>Ripe Age Time:</label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "ripeAgeHours",
					15,
					SugarLumpsMod.settings.ripeAgeHours,
					"SugarLumpsMod.inputChanged('ripeAgeHours', this.value)"
				) + '<label> : </label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "ripeAgeMinutes",
					15,
					SugarLumpsMod.settings.ripeAgeMinutes,
					"SugarLumpsMod.inputChanged('ripeAgeMinutes', this.value)"
				) + '<label> : </label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "ripeAgeSeconds",
					15,
					SugarLumpsMod.settings.ripeAgeSeconds,
					"SugarLumpsMod.inputChanged('ripeAgeSeconds', this.value)"
				) +
			'</div>' +
			'<div class="listing">' +
				'<label>Overripe Age Time:</label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "overRipeAgeHours",
					15,
					SugarLumpsMod.settings.overRipeAgeHours,
					"SugarLumpsMod.inputChanged('overRipeAgeHours', this.value)"
				) + '<label> : </label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "overRipeAgeMinutes",
					15,
					SugarLumpsMod.settings.overRipeAgeMinutes,
					"SugarLumpsMod.inputChanged('overRipeAgeMinutes', this.value)"
				) + '<label> : </label>' +
				CCSE.MenuHelper.InputBox(
					SugarLumpsMod.modData.id + "_" + "overRipeAgeSeconds",
					15,
					SugarLumpsMod.settings.overRipeAgeSeconds,
					"SugarLumpsMod.inputChanged('overRipeAgeSeconds', this.value)"
				) +
			'</div>' +
			'<div class="listing">' +
			CCSE.MenuHelper.ToggleButton(
				SugarLumpsMod.settings,
				"showLumpType",
				SugarLumpsMod.modData.id + "_" + "showLumpType",
				'Show Lump Type Enabled', 'Show Lump Type Disabled', "SugarLumpsMod.toggleButtonCallback"
			) +
			(SugarLumpsMod.settings.showLumpType ? `<label> The current lump type is: ${SugarLumpsMod.variables.lumpTypes[Game.lumpCurrentType]} sugar lump.</label>` : "") +
			'</div>';
		},

		//Method to restore and save
		restoreDefaultConfig: function(){
			SugarLumpsMod.config = SugarLumpsMod.defaultSettings;
		},

		//Toggle Button (in settings menu) callback
		toggleButtonCallback: function (prefName, button, on, off, invert) {
			if (SugarLumpsMod.settings[prefName]) {
				l(button).innerHTML = off;
				SugarLumpsMod.settings[prefName] = 0;
			}
			else {
				l(button).innerHTML = on;
				SugarLumpsMod.settings[prefName] = 1;
			}
			l(button).className = 'option' + ((SugarLumpsMod.settings[prefName] ^ invert) ? '' : ' off');
			SugarLumpsMod.onSettingsChanged();
		},

		//Check Config
		checkConfig: function () {
			for (const [key, value] of Object.entries(SugarLumpsMod.defaultSettings)) {
				if (SugarLumpsMod.settings[key] == undefined) {
					SugarLumpsMod.settings[key] = value;
				}
			}
		},

		//Update the new data
		inputChanged: function(prefName, value) {
			if (SugarLumpsMod.settings[prefName] !== undefined) {
				SugarLumpsMod.settings[prefName] = parseInt(value);
				SugarLumpsMod.onSettingsChanged();
			}
		},

		//Change in settings
		onSettingsChanged: function () {
			for (const [key, settingEnabled] of Object.entries(SugarLumpsMod.settings)) {
				if (SugarLumpsMod.actions[key] == undefined) {
					continue;
				}
				if (settingEnabled) {
					if (SugarLumpsMod.actions[key].delayTimer == undefined && SugarLumpsMod.actions[key].delayTimer !== null) {
						SugarLumpsMod.actions[key].action();
					} else {
						clearInterval(SugarLumpsMod.actions[key].delayTimer);
						SugarLumpsMod.actions[key].delayTimer = null;
						SugarLumpsMod.setDelayTimers(key);
					}
				} else if (SugarLumpsMod.actions[key].delayTimer != null) {
					clearInterval(SugarLumpsMod.actions[key].delayTimer);
					SugarLumpsMod.actions[key].delayTimer = null;
				}
			}
			Game.UpdateMenu();
		},

		//Preload variables
		restorePreviousLumps: function() {
			//Only enable it if both the mod and the background lumps settings are enabled
			if (SugarLumpsMod.settings.modEnabled && SugarLumpsMod.settings.backgroundLumps) {
				//If there is no info on the lump status, don't do anything (first time loading or corrupted data)
				//This will prevent making people mad after removing their lumps...
				if (SugarLumpsMod.settings.previousLumps >= 0 && SugarLumpsMod.settings.previousLumpT >= 0) {
					//Set the previous lump count and time and then call the loadLumps
					Game.lumps = SugarLumpsMod.settings.previousLumps;
					Game.lumpT = SugarLumpsMod.settings.previousLumpT;
					Game.loadLumps();
				}
			}
		},
	};
}

if (typeof CCSE == 'undefined')
	Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

//Mod presets
SugarLumpsMod.launch = function() {
	SugarLumpsMod.init = function () {
		SugarLumpsMod.restoreDefaultConfig();

		SugarLumpsMod.actions.changeCheck.variables.oldComputeLumpTimes = Game.computeLumpTimes;

		Game.customOptionsMenu.push(function () {
			CCSE.AppendCollapsibleOptionsMenu(SugarLumpsMod.modData.name, SugarLumpsMod.getMenuData());
		});
	
		Game.customStatsMenu.push(function () {
			CCSE.AppendStatsVersionNumber(SugarLumpsMod.modData.name, SugarLumpsMod.modData.version);
		});
				
		SugarLumpsMod.variables.isLoaded = 1;
	}

	SugarLumpsMod.save = function() {
		//Data to save from the game
		SugarLumpsMod.settings.previousLumps = Game.lumps;
		SugarLumpsMod.settings.previousLumpT = Game.lumpT;

		return JSON.stringify(SugarLumpsMod.settings);
	}

	SugarLumpsMod.load = function (data) {
		if (!SugarLumpsMod.variables.dataLoaded) {
			SugarLumpsMod.variables.dataLoaded = 1;
			SugarLumpsMod.settings = JSON.parse(data);
			SugarLumpsMod.checkConfig();
			SugarLumpsMod.onSettingsChanged();
			SugarLumpsMod.restorePreviousLumps();
		}
	}

	if (CCSE.ConfirmGameVersion(
		SugarLumpsMod.modData.id,
		SugarLumpsMod.modData.version,
		SugarLumpsMod.modData.gameVer
	)) {
		Game.registerMod(
			SugarLumpsMod.modData.id,
			SugarLumpsMod
		);
	}
}

//CCSE Hook wait
if (!SugarLumpsMod.variables.isLoaded) {
	if (CCSE && CCSE.isLoaded) {
		SugarLumpsMod.launch();
	} else {
		if (!CCSE)
			var CCSE = {};
		if (!CCSE.postLoadHooks)
			CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(SugarLumpsMod.launch);
	}
}

