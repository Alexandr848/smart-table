import { sortMap } from "../lib/sort.js";

export function initSorting(columns) {

        columns.forEach(btn => {
            btn.addEventListener('click', () => {
                // @todo: #3.2 — сбросить сортировки остальных колонок
                // "нужно сбросить состояние всех остальных кнопок"
                columns.forEach(column => {
                    if (column.dataset.field !== btn.dataset.field) {
                        column.dataset.value = 'none';
                    }
                });

                // @todo: #3.1 — запомнить выбранный режим сортировки
                btn.dataset.value = sortMap[btn.dataset.value];
            });
        });

        return (query) => {
            const column = columns.find(item => item.dataset.value !== 'none');

            if (!column) return query;

            const sort = `${column.dataset.field}:${column.dataset.value}`;
            return { ...query, sort };
        };
        
    }