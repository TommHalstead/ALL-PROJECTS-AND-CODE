'use strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'thomas' },
  { value: -125, description: 'Toys 🚂', user: 'thomas' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  thomas: 100,
}); // The Object.freeze() method makes an object immuatable.

// Pure function - Alters no outside states, returns a value, and doesn't depend on outside variables
const getLimit = (limits, user) => limits?.[user] ?? 0;
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = `Thomas`
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget1 = addExpense(
  newBudget,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Thomas'
);
console.log(newBudget, newBudget1);
const newBudget2 = addExpense(newBudget1, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value <= -getLimit(limits, entry.user)
      ? { ...entry, flag: `limit` }
      : entry
  ); // Pure function as doesn't depend on anything outside scope
// Also does not mutate a pre-existing object but creates its own using map
const finalBudget = checkExpenses(newBudget2, spendingLimits);
console.log(finalBudget);

const logExpencesOver = function (state, bigLimit) {
  // let output = '';
  const bigSpends = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(` / `);
  console.log(bigSpends);
};

logExpencesOver(finalBudget, 1);
