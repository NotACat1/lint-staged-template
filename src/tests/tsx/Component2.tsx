// Component2.tsx
import React from 'react';
import Component1 from './Component1';

const Component2: React.FC = () => {
  return (
    <div>
      <h1>Компонент 2</h1>
      <Component1 />
    </div>
  );
};

export default Component2;
