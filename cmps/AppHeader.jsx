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
            <NavLink onClick={() => setIsMenuOpen(false)} to="/">Home</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} to="/mail">Gmail</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} to="/note">Keep</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} to="/book">Books</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} to="/about">About</NavLink>
        </nav>
    </header>
}
