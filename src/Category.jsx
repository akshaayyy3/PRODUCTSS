import React from 'react';

function Category({ categories, setSelectedCategory }) {
  return (
    <div className="category-list">
      <h3>Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => setSelectedCategory(category.name)}>
            {category.name}  {/* Use category.name instead of the entire object */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;




