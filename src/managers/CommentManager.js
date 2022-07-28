export const getAllComments = () => {
    return fetch(`http://localhost:8088/comments`)
        .then(response => response.json())
}

export const addComment = (comment) => {
    return fetch("http://localhost:8088/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
    },
        body: JSON.stringify(comment)
    })
        .then(response => response.json())
}