const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <header className="app-header">
        <Link to="/">
            <h2 className="logo">Y&D</h2>
        </Link>
        <div onClick={() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)} className="nav-menu">
            <span className="material-symbols-outlined">menu</span>
        </div>
        <nav className={isMenuOpen? 'open' : ''}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mail">Gmail</NavLink>
            <NavLink to="/note">Keep</NavLink>
            <NavLink to="/book">Books</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
}
