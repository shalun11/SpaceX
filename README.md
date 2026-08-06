## p.s У меня лично не грузит без впн

## Демо
https://shalun11-spacex.netlify.app

## Что реализовано

- Список запусков SpaceX из API `https://kata-spacex.onrender.com/api/launches`
  (карточки Mantine `Card` с пропсами `shadow="sm" padding="md" radius="md" withBorder`);
- модальное окно с деталями запуска, реализованное через `createPortal`
  (не компонент Mantine и не сторонняя библиотека);
- управление состоянием через `useReducer` (без `useState`);
- `StrictMode` включён;
- типизация ответа сервера и пропсов компонентов;
- тесты основных сценариев (Vitest + React Testing Library): рендер списка,
  открытие и закрытие модального окна.
