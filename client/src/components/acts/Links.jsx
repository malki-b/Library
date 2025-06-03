import { Link } from "react-router-dom"
function Links() {
    const links = ['Home', 'Todos', 'Posts']
    return (<>
        {links.map((link, index) => (
            <Link key={index} to={`/${link}`} className={`${link}-link`}>{link}</Link>
        ))}
    </>)
}
export default Links