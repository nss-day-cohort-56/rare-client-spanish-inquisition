import { useEffect, useState } from "react";
import { getCategories, saveCategory, deleteCategory, editCategory } from "../../managers/CategoryManager";
import "./Categories.css"


// categories component to display the categories

export const Categories = () => {

    const [categories, setCategories] = useState([])
    const [category, addCategory] = useState({
        label: ""
    })
    
    useEffect(() => {
        getCategories()
            .then(setCategories)
    },
        []
    )

    // when create button is clicked, the new category is added to the list, and the form resets 
    const saveButtonClick = (event) => {
        event.preventDefault()
        saveCategory(category)
            .then(() => {
                getCategories()
                    .then(setCategories)
            })
        addCategory({
            label: ""
        })
    }

    // function to 
    const deleteButton = (id) => {
        deleteCategory(id)
            .then(() => {
                getCategories()
                    .then(setCategories)
            })
    }

    // function to edit category 
    const editButton = (categoryObj) => {
        editCategory(categoryObj)
            .then(() => {
                getCategories()
                    .then(setCategories)
            })
    }





    return (
        <>
            <section>
                <h2 className="cat_header">Categories</h2>

                <article className="all_cat">
                    <div>
                        {
                            categories.map(category => {
                                return <section className="cat_list" key={`category--${category.id}`}>
                                    <div>

                                        {/* DELETE BUTTON */}

                                        <button className="dt_btn" key={`delete--category--btn--${category.id}`}
                                            onClick={() => {
                                                const confirmBox = window.confirm("Do you really want to delete this category?")
                                                if (confirmBox === true) {
                                                    deleteButton(category.id)
                                                }
                                            }}>

                                            ❌</button>
                                        
                                        {/* EDIT BUTTON */}

                                        <button className="edit_btn" key={`edit--category--btn--${category.id}`}
                                            onClick={() => {
                                                //store prompt from window in edit box
                                                const editBox = window.prompt("Edit this category", "")
                                                //make copy of current category
                                                const categoryCopy = {...category}
                                                //update category copy to reflect input
                                                categoryCopy.label = editBox
                                                // pass category copy into editButton function
                                                editButton(categoryCopy)
                                            }}>

                                        edit</button>
                                        {category.label}
                                    </div>
                                </section>
                            })
                        }
                    </div>

                    <aside className="new_cat">
                        <form className="input_cat">
                            <h2>Create a New Category</h2>
                            <div >
                                <input required
                                    type="text" placeholder="Enter New Category" value={category.label}
                                    onChange={
                                        (event) => {
                                            const copy = { ...category }
                                            copy.label = event.target.value
                                            addCategory(copy)
                                        }
                                    } /> < br />
                                <button className="btn" onClick={(clickEvent) => saveButtonClick(clickEvent)}
                                >Create</button>
                            </div>
                        </form>
                    </aside>
                </article>
            </section>
        </>
    )
}