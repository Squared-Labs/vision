module.exports = {
"packagerConfig": { },
      "makers": [
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin",
            "linux",
            "windows"
          ]
        },
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "setupExe": "vision-browser-installer",
            "iconURL": "https://raw.githubusercontent.com/BeanedTaco/vision/master/build/star.ico"
          }
        }
      ]
}