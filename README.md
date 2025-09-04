# game-randomizer

A Node.js module for randomly selecting and launching retro games from your ROM collection. Supports multiple emulators including RetroArch, RALibretro, and BizHawk.

## Features

- 🎮 **Multi-Emulator Support**: Works with RetroArch, RALibretro, BizHawk, and more
- 🎲 **Smart Randomization**: Randomly selects games from configured ROM directories
- 🏷️ **Console Filtering**: Filter games by specific console/platform
- 📁 **Flexible ROM Scanning**: Uses glob patterns to find ROMs in nested directories
- ⚙️ **Configurable Commands**: Custom command line arguments per console
- 🔄 **Process Management**: Automatically closes running emulators before launching new games

## Installation

```bash
npm install game-randomizer
```

## Quick Start

1. **Create Configuration File**
   Copy `game-config_example.json` to `game-config.json` and update paths:

```json
{
    "emulators": [
        {
            "name": "RALibretro",
            "executable": "C:/Emulators/RALibretro/RALibretro.exe",
            "commandLineOptions": "",
            "consoleTags": ["nes", "snes", "genesis"]
        }
    ],
    "consoles": [
        {
            "name": "Super Nintendo",
            "romRoots": ["C:/ROMs/SNES/**/*.+(smc|sfc)"],
            "commandLineOptions": "--core snes9x_libretro --system 3 --game",
            "tags": ["snes"]
        }
    ]
}
```

2. **Use as Module**

```javascript
import { GameRandomizer } from 'game-randomizer'

const randomizer = new GameRandomizer()
await randomizer.scanForGames('game-config.json')

const randomGame = await randomizer.pickRandomGame()
if (randomGame) {
    await randomGame.emulator.run(randomGame.console, randomGame.game)
}
```

3. **Run Standalone**

```bash
RUN_GAME_RANDOMIZER_AT_LAUNCH=true node index.js
```

## Configuration

### Emulators
Define emulators with their executable paths and supported console tags:

```json
{
    "name": "RALibretro",
    "executable": "path/to/RALibretro.exe",
    "commandLineOptions": "",
    "consoleTags": ["nes", "snes", "genesis"]
}
```

### Consoles
Configure ROM directories and emulator-specific command line options:

```json
{
    "name": "Super Nintendo",
    "romRoots": ["path/to/snes/roms/**/*.+(smc|sfc)"],
    "commandLineOptions": "--core snes9x_libretro --system 3 --game",
    "tags": ["snes"]
}
```

### Glob Patterns
Use glob patterns to scan ROM directories:
- `**/*.smc` - All .smc files in subdirectories
- `**/*.+(smc|sfc)` - Multiple extensions
- `Retail Games/**/*.smc` - Specific subdirectory

## API Reference

### GameRandomizer

#### `constructor(config?)`
Create a new randomizer instance.

#### `async scanForGames(configPath?)`
Scan ROM directories based on configuration file.

#### `async pickRandomGame(options?)`
Randomly select a game. Options can include `consoleTag` for filtering.

### GameRandomizerOptions

#### `constructor(consoleTag?)`
Options for game selection. Pass `consoleTag` to filter by console.

## Console Filtering

Filter games by specific console:

```javascript
import { GameRandomizerOptions } from 'game-randomizer'

const options = new GameRandomizerOptions('snes')
const snesGame = await randomizer.pickRandomGame(options)
```

## Supported Emulators

- **RALibretro**: RetroAchievements-enabled RetroArch
- **RetroArch**: Multi-system emulator
- **BizHawk**: Multi-system emulator with tool-assisted speedrun features
- **Custom**: Any emulator with command line support

## Development

```bash
git clone https://github.com/MikeMayer/game-randomizer.git
cd game-randomizer
npm install
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run `npm test` and `npm run lint`
6. Submit a pull request

## License

This project is licensed under the Unlicense - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [mayer-robo](https://github.com/MikeMayer/mayer-robo) - Twitch bot that uses game-randomizer for `!rg` commands
