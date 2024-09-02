import InputForm from "../Elements/Input"
import Button from "../Elements/Button/Button"

const FormRegister = () => {
    return(
        <form>
            <InputForm
            type="text" 
            placeholder="enter your name" 
            label="Full Name" 
            name="fullname"
            />
            <InputForm
            type="email" 
            placeholder="enter your email" 
            label="Email" 
            name="email"
            />
            <InputForm 
            type="password" 
            placeholder="*****" 
            label="Password" 
            name="password"
            />
            <InputForm 
            type="password" 
            placeholder="*****" 
            label="Confirm Password" 
            name="confirmPassword"
            />
            <Button classname="bg-green-500 w-full text-white">Register</Button>
        </form>
    )
}

export default FormRegister