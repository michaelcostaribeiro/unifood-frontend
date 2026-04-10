import React, { useState } from 'react'

const FoodNav = ({ foodTypes, selectedType, setSelectedType }) => {
    const allCategories = ['🍽 Todos', ...foodTypes.map((ftype) => `${ftype.type_icon} ${ftype.type_name}`)]
    return (
        <nav className='flex gap-2 overflow-x-scroll hideScroll py-1'>
            {allCategories.map((type, i) => {
                let type_name = type.split(' ')[1]
                return <button
                    className={`btn-food ${selectedType === type_name ? 'active ' : ''} `}
                    key={i}
                    onClick={() => setSelectedType(type_name)}
                >{type}</button>
            })}
        </nav>
    )
}

export default FoodNav