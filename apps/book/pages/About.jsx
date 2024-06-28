const { Link, Outlet } = ReactRouterDOM

export function About() {
    return (
        <section className="about-container">
            <h2>Welcome to another project by Dolev Levy!</h2>
            <h3>This was written using React</h3>

            <nav className="about-links">
                <Link replace to="/about/team">Team</Link>
                <Link replace to="/about/goal">Goal</Link>
            </nav>

            <section>
                <Outlet />
            </section>
        </section>

    )
}