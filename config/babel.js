module.exports = () => (
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "debug": false,
          "targets": {
            "node": "8",
            "browsers": [
              "last 3 versions"
            ]
          }
        }
      ]
    ]
  }
)