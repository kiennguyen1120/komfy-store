import {
  Form,
  useLoaderData,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import React, { useState } from "react";

const ProductSearch = () => {
  const { categories } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("keyword") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category_id") || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cập nhật URL với các tham số tìm kiếm mới
    const params = new URLSearchParams();
    if (searchQuery) params.set("keyword", searchQuery);
    if (selectedCategory) params.set("category_id", selectedCategory);
    setSearchParams(params);

    // Điều hướng đến trang tìm kiếm mới
    navigate(`/products?${params.toString()}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSearchParams({});
    navigate("/products");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
    >
      {/* SEARCH */}
      <input
        type="text"
        name="keyword"
        placeholder="search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="input input-sm w-full"
      />
      {/* CATEGORIES */}
      <select
        name="category_id"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="select select-sm w-full"
      >
        <option value="">all</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="btn btn-accent btn-sm"
      >
        reset
      </button>
    </Form>
  );
};

export default ProductSearch;
