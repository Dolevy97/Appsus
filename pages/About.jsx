
export function About() {
    return <section className="about">
        <h2>Welcome to AppSus!</h2>

        <h3>We are Yonatan Hershko and Dolev Levy, students at "Coding Academy" on our journey to becoming full-stack developers.</h3>
        <h3>We created this website using React JS, showcasing our skills and passion for web development.</h3>

        <h4>Thank you for visiting AppSus. We hope you enjoy exploring our site as much as we enjoyed building it!</h4>

        <div className="images-container">
            <section className="dolev-image">
                <img className="pixel-img" src="./../assets/imgs/DolevPixel.png" alt="" />
                <div className="social-container">
                    <a href="https://www.linkedin.com/in/dolev-levy-658436223/" target="_blank"><img className="social-logo" src="./../assets/imgs/linkedin-logo.png" alt="" /></a>
                    <a href="https://github.com/Dolevy97" target="_blank"><img className="social-logo" src="./../assets/imgs/github-logo.png" alt="" /></a>
                </div>
            </section>
            <section className="yona-image">
                <img className="pixel-img" src="./../assets/imgs/DolevPixel.png" alt="" />
                <div className="social-container">
                    <a href="https://www.linkedin.com/in/yonatan-hershko-022718255/" target="_blank"><img className="social-logo" src="./../assets/imgs/linkedin-logo.png" alt="" /></a>
                    <a href="https://github.com/yonatanhershko" target="_blank"><img className="social-logo" src="./../assets/imgs/github-logo.png" alt="" /></a>
                </div>
            </section>
        </div>
    </section>
}
