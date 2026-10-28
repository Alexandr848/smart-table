

export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
    // @todo: #4.1 — заполнить выпадающие списки опциями
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            }));
        });
    }

    const applyFiltering = (query, state, action) => {
            if (action && action.name === 'clear') {
                const parent = action.parentElement;
                const input = parent.querySelector('input');
                if (input) {
                    input.value = '';
                }
                const fieldName = action.dataset.field;
                if (fieldName) {
                    state[fieldName] = '';
                }
            }
            // @todo: #4.5 — отфильтровать данные используя компаратор
            const filter = {};
            Object.keys(elements).forEach(key => {
                if (elements[key]) {
                    if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                        filter[`filter[${elements[key].name}]`] = elements[key].value;
                    }
                }
            });

            return Object.keys(filter).length ? Object.assign({}, query, filter) : query;    
        }
    return {applyFiltering, updateIndexes};
}
