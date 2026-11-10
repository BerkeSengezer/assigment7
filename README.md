# Turkish Bazzaar

A React storefront with products from DummyJSON, search and category filters, a cart, demo sign-in, and light and dark themes.

## Run locally

1. Run `npm ci`.
2. Run `npm run dev` and open the address Vite prints.
3. Sign in with `student@example.com` and `demo123456`. To use your student email, set `VITE_DEMO_EMAIL` in `.env.local` and restart Vite.

Run `npm run build` to check the production build.

## File organization

- `src/App.jsx` defines the routes.
- `src/Layout.jsx` contains the menu, theme button, and footer.
- `src/pages/` contains the product, cart, and login screens.
- `src/components/` contains product cards and the protected route.
- `src/api/` handles product requests and demo login.
- `src/hooks/` handles fetching and theme storage.
- `src/context/` holds the login state, and `src/store/` holds the cart.
- `src/theme.css` sets the colors for both themes.

## Reasoning questions

### 1. Where did I put each kind of state?

I keep the signed-in user in Context so the menu and cart route can check the same login state. I keep the cart in Zustand and save it to local storage so it survives a refresh. I put the filters in the URL so I can open the same search again, and I keep products in the page's fetch state because the API provides them. I save the theme with the local storage hook so the app remembers my choice.

### 2. Why Context for login and Zustand for the cart?

Login only changes when someone signs in or out, so Context is enough. The cart changes more often, and Zustand lets the menu watch just the item count. With one Context for the cart, every component reading it would update whenever the cart value changed. A Zustand store for login would add a separate store for a small piece of state.

### 3. What does the fetch hook share?

Both product pages use the same hook for loading, errors, and canceling requests. Each page makes its own request and keeps its own result.

### 4. What type is the product ID?

The ID from the route is a string. I encode it before adding it to the API URL. In the cart I use the numeric ID from the product returned by the API.

### 5. Why is the login only a demo?

The route checks the login state in the browser. Someone can change browser code, so this check alone cannot protect private data. A real app needs a server to verify the login and authorize each protected request.

### 6. What happens if I refresh a product link?

A basic static server may return 404 for a path like `/products/3` because it has no file there. Vite sends the main HTML file so React Router can read the address and show the right page. A production host needs a similar fallback.

## Self-study notes

- I copy the URL parameters before updating one filter so the other filter stays in the URL. [React Router useSearchParams](https://reactrouter.com/api/hooks/useSearchParams)
- I parse the saved cart as JSON and check the items before using them. If the saved data is missing or invalid, the cart starts empty. A Zustand subscription saves cart changes outside React. [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) · [Zustand create](https://zustand.docs.pmnd.rs/reference/apis/create)
- The app sets a theme attribute on the page, and CSS uses it to choose the text and background colors. [MDN CSS attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors)

## Challenges

Running the cart setup twice created duplicate imports. The build output showed which declarations were repeated, and removing the duplicates fixed the build. The login heading was also hard to see in light mode, so I made headings use the active theme's text color.
