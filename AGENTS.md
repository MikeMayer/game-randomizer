# AI Agent Guide for game-randomizer

## Project Overview
**game-randomizer** is a Node.js module that enables game selection, randomization, and emulator launching. It scans ROM directories, randomly selects games, and launches them with appropriate emulators like RetroArch, RALibretro, or BizHawk.

## Architecture & Key Components

### Core Structure
```
/
├── model/              # Core data models
│   ├── configuration.js # Configuration parsing and management
│   ├── console.js      # Console/platform definitions
│   ├── emulator.js     # Emulator execution logic
│   └── game.js         # Game file representation
├── test/               # Unit tests
├── index.js            # Main module exports and CLI entry
├── utility.js          # Helper functions
└── game-config.json    # Configuration file (user-created)
```

### Key Classes
- **GameRandomizer**: Main class for scanning and picking games
- **Configuration**: Manages emulators and consoles from JSON config
- **Console**: Represents gaming platforms with ROM paths and command line options
- **Emulator**: Handles launching games with specific emulators
- **Game**: Represents individual ROM files

## Development Environment

### Prerequisites
- Node.js v16+
- ESM module support
- Windows (for emulator launching features)

### Setup Commands
```bash
npm install          # Install dependencies
npm test            # Run tests with Mocha
npm run lint        # Run ESLint
```

### Configuration
Create `game-config.json` with emulators and consoles:
```json
{
    "emulators": [
        {
            "name": "RALibretro",
            "executable": "path/to/RALibretro.exe",
            "commandLineOptions": "",
            "consoleTags": ["nes", "snes", "genesis"]
        }
    ],
    "consoles": [
        {
            "name": "Super Nintendo",
            "romRoots": ["path/to/snes/roms/**/*.+(smc|sfc)"],
            "commandLineOptions": "--core snes9x_libretro --system 3 --game",
            "tags": ["snes"]
        }
    ]
}
```

## AI Agent Development Guidelines

### Adding New Emulator Support
1. Add emulator entry to `game-config.json`
2. Update `model/emulator.js` if special handling needed
3. Add appropriate `consoleTags` to match console platforms
4. Test with `npm test`

### Extending Console Support
1. Add console configuration with proper glob patterns for ROM scanning
2. Set appropriate `commandLineOptions` for emulator-specific arguments
3. Use correct `tags` to match with emulator `consoleTags`
4. Test ROM scanning with various file extensions

### Modifying Game Selection Logic
- **Core Logic**: `GameRandomizer.pickRandomGame()` in `index.js`
- **Filtering**: Uses `intersection()` utility for tag matching
- **Randomization**: Uses `random()` utility for selection
- **Console Filtering**: Filter by `consoleTag` in `GameRandomizerOptions`

### Code Quality Standards
- **ES Modules**: Use `import/export` syntax
- **JSDoc**: Document all public methods and classes
- **Testing**: Write tests in `test/` directory using Mocha
- **Linting**: Follow ESLint configuration
- **Error Handling**: Graceful degradation for missing files/configs

### Common Patterns
```javascript
// Configuration loading
const config = Configuration.fromString(configFileContent)

// Game scanning
await console.scanForGames()

// Random selection with filtering
const options = new GameRandomizerOptions('snes')
const result = await randomizer.pickRandomGame(options)

// Game launching
await result.emulator.run(result.console, result.game)
```

### File System Integration
- **Glob Patterns**: Uses `glob` package for ROM file discovery
- **Absolute Paths**: All file operations use absolute paths
- **Cross-Platform**: Handles Windows/Unix path differences
- **File Extensions**: Supports multiple ROM formats per console

### Emulator Integration
- **Command Line**: Builds commands from emulator + console options
- **Process Management**: Kills existing emulator processes before launching
- **Platform Detection**: Windows-specific process termination
- **Error Handling**: Logs exec errors without crashing

### Performance Considerations
- **Lazy Loading**: Games scanned only when needed
- **Caching**: Game paths cached in Set for fast access
- **Async Operations**: All file operations are async
- **Memory Management**: Efficient game list handling

### Testing Strategy
- **Unit Tests**: Test individual classes and methods
- **Integration Tests**: Test full workflow from config to launch
- **Mock Data**: Use test fixtures for consistent results
- **Error Cases**: Test missing files, invalid configs

### Common Tasks for AI Agents
1. **Add New Emulator**: Extend emulator support
2. **Fix ROM Scanning**: Debug glob patterns and file discovery
3. **Improve Selection**: Enhance randomization logic
4. **Platform Support**: Add macOS/Linux emulator support
5. **Configuration**: Simplify config file management
6. **Error Handling**: Improve robustness
7. **Performance**: Optimize scanning and selection

### Configuration Best Practices
- **Glob Patterns**: Use forward slashes even on Windows
- **Command Line Options**: Combine emulator + console specific args
- **Tags**: Use consistent naming for console/emulator matching
- **Paths**: Use absolute paths to avoid working directory issues

### Debugging Tips
- **Logging**: Use `console.log()` for debugging (no logger framework)
- **Process Inspection**: Check running emulator processes
- **File Paths**: Verify ROM file discovery with glob patterns
- **Config Validation**: Ensure JSON syntax and required fields

### Integration Points
- **mayer-robo**: Used as dependency for Twitch bot game commands
- **CLI Usage**: Can be run standalone with environment variables
- **NPM Module**: Exported classes for external consumption
- **File System**: Reads local ROM directories and config files

### Before Committing
- Run `npm test` and ensure all tests pass
- Run `npm run lint` and fix any issues
- Test with actual ROM files and emulators
- Verify cross-platform compatibility where possible
- Update version in `package.json` for releases

### Security Considerations
- **File Paths**: Validate ROM paths to prevent directory traversal
- **Command Injection**: Sanitize file paths in exec commands
- **Process Management**: Safely handle child process termination
- **Configuration**: Validate JSON structure and required fields

### Future Improvements
- Add macOS/Linux emulator support
- Implement game metadata and filtering
- Add web interface for configuration
- Support for additional emulator types
- Game history and favorites tracking
- Better error reporting and logging
