module.exports = () => ({
    "parserOptions": {
        parser: "babel-eslint",
        "requireConfigFile": false
    },
    "extends": [
        "airbnb-base",
        "plugin:vue/recommended"
    ],
    "rules": {
        "no-empty": [
            "warn"
        ],
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 1
    }
});
