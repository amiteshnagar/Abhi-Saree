export default function ProductSearch({
    searchQuery,
    onSearchChange,
    onClearSearch,
    filteredCount,
    totalCount,
    inputRef
}) {
    const trimmedQuery = searchQuery.trim();

    return (
        <div className="search-control-group">
            <label htmlFor="saree-search-input" className="search-label">
                Search Sarees
            </label>
            <div className="search-input-wrapper">
                <input
                    id="saree-search-input"
                    ref={inputRef}
                    type="search"
                    className="search-input"
                    placeholder="Search by saree name or fabric..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button
                        type="button"
                        className="search-clear-btn"
                        onClick={onClearSearch}
                        aria-label="Clear search input"
                        title="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
            <p className="search-result-count" role="status" aria-live="polite">
                Showing {filteredCount} of {totalCount} sarees
                {trimmedQuery && (
                    <>
                        {' '}matching &ldquo;<strong>{trimmedQuery}</strong>&rdquo;
                    </>
                )}
            </p>
        </div>
    );
}
