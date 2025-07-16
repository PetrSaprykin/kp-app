# Задание на стажировку ВК

Это моё тестовое задание для стажировки ВКонтакте на позицию Web-разработчик (Пётр Сапрыикн)

Приложение сделано на стеке react+typescript+mobX, также использовался axios для отправки запросов на сервер и react-router для навигации между страницами. Плюсом стоит eslint и форматтер prettier

!!! В проекте я использовал API сервиса TMDB, который в нашей стране работать не хочет, поэтому фильмы в приложении подгружаются только с включенным VPN :/ !!!

Для запуска проекта необходимо:

- склонировать этот репозиторий (или скачать в zip и разархивировать) 
- открыть терминал из директории проекта и прописать ```npm install``` для установк всех nodejs библиотек
- запустить приложение, прописав команду ```npm run dev```, после этого можно будет посмотреть по адресу localhost:3000 (или другой порт, если 3000 у вас занят)

Также я загрузил уже сбилженный сайт на хостинг - https://vk-internship.new-devs.ru


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
