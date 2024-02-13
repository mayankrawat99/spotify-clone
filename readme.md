# Music Player Web Application

This is a web application that allows users to browse albums and play songs from those albums.

## Features

- Browse albums and view album details
- Play songs from selected albums
- Control playback (play, pause, previous, next)
- Adjust volume and seek through song timeline
- Toggle sound on/off

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Open the project directory in your code editor.
3. Start a local web server to serve the files. You can use Python's built-in HTTP server:

    ```bash
    python3 -m http.server
    ```

    Or if you prefer using Node.js, you can use the `http-server` package:

    ```bash
    npm install -g http-server
    cd path/to/your/project
    http-server
    ```

4. Open your web browser and navigate to the URL provided by your web server.

## Usage

- Click on an album to view its songs.
- Click on a song to play it.
- Use the playback controls (play, pause, previous, next) to control the playback.
- Adjust volume using the volume bar.
- Seek through the song timeline using the seek bar.
- Click the sound icon to toggle sound on/off.
- Click the menu icon to display/hide the menu.

## Adding More Songs

You can easily add more songs to the project by placing them in the designated folder. The application will automatically detect new songs added to the folder and display them in the user interface.

To add more songs:

1. Locate the folder where the existing songs are stored in your project directory.
2. Copy or move the new songs into this folder.
3. Restart the application if it's already running, or simply navigate to the main page to see the newly added songs.

The application dynamically retrieves the list of songs from the folder, so you don't need to modify any code to display the new songs. They will automatically appear in the list of available songs for users to play.

## Technologies Used

- **HTML**: Used for structuring the web page.
- **CSS**: Used for styling the user interface.
- **JavaScript**: Used for implementing the music player functionality.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.
