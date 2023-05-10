const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'thomas' },
  { value: -125, description: 'Toys 🚂', user: 'thomas' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  thomas: 100,
};

const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpense = function (value, description, user = `Thomas`) {
  user = user.toLowerCase();
  if (value <= getLimit(user))
    budget.push({ value: -value, description, user });
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Thomas');
addExpense(200, 'Stuff', 'Jay');

const checkExpenses = function () {
  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
};

checkExpenses();

const logBigExpenses = function (bigLimit) {
  let output = '';
  const bigSpends = budget.filter(entry => entry.value <= -bigLimit);
  bigSpends.forEach((item, idx, arr) => {
    output +=
      idx === arr.length - 1
        ? `${item.description.slice(-2)}`
        : `${item.description.slice(-2)} / `;
  });
  console.log(output);
};

console.log(budget);
logBigExpenses(100);
