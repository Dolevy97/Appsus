const { NavLink } = ReactRouterDOM

export function BookAppHeader() {
    return (
        <header className="book-app-header">
            <h1>Miss Books</h1>
            <nav className="book-nav-links">
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}