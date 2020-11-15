import * as React from 'react';

export const ScannedContext = React.createContext({
  scanned: [],
  calorieTarget: 3000,
});

export const ScannedContextProvider = ({ children }) => {
  const [scanned, setScanned] = React.useState([]);
  const [calorieTarget, setCalorieTarget] = React.useState(3000);

  const addScannedItem = (item) => {
    setScanned([item, ...scanned]);
  };

  const getConsumedMetrics = () => {
    let consumed = 0;
    scanned.forEach((item) => {
      consumed += parseInt(item.totalCalories);
    });

    const percentage = ((consumed / calorieTarget) * 100).toFixed(2);

    return { percentage, consumed };
  };

  return (
    <ScannedContext.Provider
      value={{ scanned, calorieTarget, addScannedItem, getConsumedMetrics, setCalorieTarget }}
    >
      {children}
    </ScannedContext.Provider>
  );
};
