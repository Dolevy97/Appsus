const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h2 className="logo">Y&D</h2>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mail">Gmail</NavLink>
            <NavLink to="/note">Keep</NavLink>
            <NavLink to="/book">Books</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
}
