import { Link } from "react-router-dom";
import Icon from "../studio/Icon";

export default function NotFound() {
  return <main className="not-found-page"><div><p className="eyebrow">404 / A small detour</p><h1>This pixel<br /><em>is off the grid.</em></h1><p>The page you’re looking for isn’t here. My work, experience, and contact details are one click away.</p><Link className="button button-lime" to="/">Back to the portfolio <Icon name="arrow" /></Link></div></main>;
}
