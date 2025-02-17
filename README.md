This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Inspiration

This project was created for a tech challenge example found on web.

Should be simple, but functional.
As this was not an actual tech challenge, but an example I found for inspiration, so I created it with next.js because I wanted to have a sproject with this framework as part of my portfolio, but I know is not the best use case to highlight the improvements of this stack.

```
Create a UI that has:
1. board that allows turning on and off squares
2. A way to advance to the next state
3. A way to play forever the next states
4. A way to advance x number of states
With a normal web service there might be an API, but the React app should take the place of the API.
Include all code to simulate the Game of Life but treat that code as if it were going to be called from an
API. Do not implement a backend API, unless you want to.

This could take four to five hours. The implementation should be production ready. You don’t need to
implement any authentication/authorization. Be ready to discuss your solution.
```

## Getting Started

First, run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

will try to follow the next structure

```js
service/ // mock API
--actions/
----index.ts
----actions.test.ts // tests are near the tested file.

globalComponents/ // I think it won't be needed
--componentName/
----index.ts
----componentName.test.ts

app/
--page/
----page.ts
----page.test.ts
------componentName/
--------index.ts
--------componentName.test.ts
```

## Tests

Testing individual components to check re-usability (it reacts to its props) and core functionality ("have a header")(Unit test).
Testing pages to test user perspective ("Show a title"), and integration (when user clicks a particular action should be fired).
Testing service's actions at unit level

### mock API

It is located under `service` folder.

- According to the Games rules, we have two possible states for a cell, "Live" or "Dead"
- Every cell interacts with its neighbours, we need to know how many living cells are around it.
- We need to perform some checks to know the cell's next state:
  - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  - Any live cell with two or three live neighbours lives on to the next generation.
  - Any live cell with more than three live neighbours dies, as if by overpopulation.
  - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
- We should be able to run x amount of cycles for a game state.

The API will have one endpoint/action that will take 2 arguments

- grid: Grid `required`
- steps: Number `optional`
  And it will provide a grid state.

**Response**

```ts
{
    status: 'success': 'fail',
    error: {
grid: string[] | null,
steps: string[] | null
    } // or null,
    data: Grid // Game Next State, or Previous one if there is an error.
}
```

**Errors**

- When `steps` is invalid
- When `grid` is invalid
- When an internal error happens

### UX/UI Design

I asked Deepseek about the best UX/UI to use on this website.

**Header:**

Title: "Conway's Game of Life"

Short description: "A cellular automaton simulation."

**Main Content:**

Grid: Center the grid on the page. Make it responsive so it scales nicely on all screen sizes.

Controls: Place buttons and inputs below or beside the grid (depending on screen size).

**Footer:** (Is not required by the example)

Add a link to learn more about Conway's Game of Life (e.g., Wikipedia).

Optionally, include a "Reset Grid" button here.(Placed with the rest)

### Responsive Design

**Desktop:**

Grid takes up most of the screen width.

Controls are placed below the grid in a single row.

**Tablet:**

Grid scales down slightly.

Controls are stacked vertically below the grid.

**Mobile:**

Grid is smaller, with cells scaled down to fit the screen.

Controls are stacked vertically.

### Stories

- User should be able to see the title "Conway's game of life"
- User should be able to see a description "A cellular automaton simulation."
- User should be able to see the game's grid
- User should be able to select the initial state
- User should be able to advance click on 'Restart' button
- User should be able to advance click on 'Next state' button
  - User should be able to see a loading state
  - User should be able to see the game's next state
- User should be able to check 'Play Forever' checkbox
  - User should be able to see the game's next state every second
  - User should be able to see a message "Automated Game" on top of the game's grid
  - User should not be able to alter the game's grid when the game is being played forever.
  - User should be able to uncheck 'Play Forever' checkbox
- User should be able to type a number on "Advance Steps" input
  - User should not be able to place a negative number, or zero.
- User should be able to click on "Advance steps" button.
  - User should be able to see the game's next state
- User should be able to see an error when it happens
