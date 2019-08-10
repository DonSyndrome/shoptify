module.exports = {
    extends: "airbnb",
    settings: {
        'import/resolver': {
          node: { extensions: ['.js', '.tsx'] }
        }
      },
    rules: {
        "no-unused-vars": ["error", { "args": "none","argsIgnorePattern": "^_" }],
        "import/newline-after-import": "off",
        "no-console": "off",
        "camelcase": ["error",{ "properties": "never" }]
    }
};