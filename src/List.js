import React from "react";

export function List({ list, removeItem, editItem }) {
    return (
        <article className="list">
            {list.map(function (item) {
                    const { id, title } = item;
                    return (
                        <div className="list-item" key={id}>
                            <h3>{title}</h3>
                            <div className="icons">
                                <button type="button" onClick={() => removeItem(id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button type="button" onClick={() => editItem(id)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    );
                })}
        </article>
    )
}