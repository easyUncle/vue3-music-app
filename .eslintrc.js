module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    //process.env.NODE_ENV当run build时为production,run serve时为development,run test时为test,这是vue-cli内部的默认值,不需要配置.
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: 0,
    'space-before-function-paren': 0
  }
}
