const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'silk', label: 'Silk' },
    { id: 'cotton', label: 'Cotton' },
    { id: 'georgette', label: 'Georgette' }
];

export default function CategoryFilter({ activeFilter, onSelectFilter }) {
    return (
        <div className="filter-controls" role="group" aria-label="Filter products by fabric category">
            {FILTERS.map(({ id, label }) => {
                const isActive = activeFilter === id;
                return (
                    <button
                        key={id}
                        type="button"
                        className={`filter-btn ${isActive ? 'active' : ''}`.trim()}
                        data-filter={id}
                        aria-pressed={isActive}
                        onClick={() => onSelectFilter(id)}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
