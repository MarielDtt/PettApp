module.export = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
        "semi": ["error", "always"], // Asegura el uso de punto y coma
        "quotes": ["error", "single"], // Usa comillas simples
        "indent": ["error", 2], // Indentación de 2 espacios
        "no-unused-vars": "warn", // Muestra advertencia para variables no usadas
        "@typescript-eslint/no-explicit-any": "error", // Evita el uso de 'any'
        "@typescript-eslint/no-unused-vars": ["warn"], // Advertencia si hay variables declaradas no utilizadas
        "no-var": "error"
    }
}