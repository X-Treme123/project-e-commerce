import Button from "../Components/Elements/Button/Button"

const AboutPage = () => {

    const handleLogin = () => {
        window.location.href = "/"
    }

    return(
        <div>
            <navbar className="bg-blue-700 text-white flex justify-between px-10 h-20 items-center">
                <h1 className="text-2xl font-bold">TrendMart</h1>
                <Button onClick={handleLogin}>Kembali</Button>
            </navbar>
        </div>
    )
}

export default AboutPage