import SignIn from "../components/SignIn";

export default function WelcomePage() {
    return(
        <>
        <div className="WelcomePage">
        Welcome Page
        <li>Have an animated welcome</li>
        <li>Has sign in button</li>
        <li>Signup Button</li>
        <li>FAQ Button: make this accordion or modal</li>
        <SignIn></SignIn>
        </div>
        </>
    )
}