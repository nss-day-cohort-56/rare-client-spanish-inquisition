export const getAllCategories = () => {
    return fetch(`http://localhost:8088/categories`)
        .then(response => response.json())
}

export const getCategories = () => {
    return fetch("http://localhost:8088/categories")
        .then(res => res.json())
};

export const saveCategory = (cat) => {
    return fetch("http://localhost:8088/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    }).then(getCategories);
};

export const deleteCategory = (catId) => {
    return fetch(`http://localhost:8088/categories/${catId}`, {
        method: "DELETE"
    })
}

export const editCategory = category => {
    return fetch(`http://localhost:8088/categories/${category?.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
};
