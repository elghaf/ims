"use client";
import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../types";

export default function CategoryTable() {
    const { categories, isLoading, error, createCategory, updateCategory, deleteCategory } = useCategories();
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState<number | null>(null);
    const [editName, setEditName] = useState("");

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
            createCategory({ name: newCategoryName });
            setNewCategoryName("");
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category.id);
        setEditName(category.name);
    };

    const handleUpdate = (id: number) => {
        if (editName.trim()) {
            updateCategory({ id, category: { name: editName } });
            setEditingCategory(null);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this category?")) {
            deleteCategory(id);
        }
    };

    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div className="text-red-500">Error loading categories: {error.message}</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>

            {/* Create Category Form */}
            <form onSubmit={handleCreate} className="mb-6 flex space-x-2">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New category name"
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Add Category
                </button>
            </form>

            {/* Categories Table */}
            {categories?.length === 0 ? (
                <p className="text-gray-500">No categories found.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCategory === category.id ? (
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    ) : (
                                        category.name
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {editingCategory === category.id ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdate(category.id)}
                                                className="text-green-600 hover:text-green-900 mr-4"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingCategory(null)}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}