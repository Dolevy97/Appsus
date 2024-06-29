const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <header className="app-header">
        <Link to="/">
            <article className="app-logo-container">
                <img className="app-logo" src="./assets/imgs/YDLogo.png" alt="Logo" />
            </article>
        </Link>
        <div onClick={() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)} className="nav-menu">
            <span className="material-symbols-outlined">menu</span>
        </div>
        <nav className={isMenuOpen ? 'open' : ''}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mail">Gmail</NavLink>
            <NavLink to="/note">Keep</NavLink>
            <NavLink to="/book">Books</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
}
