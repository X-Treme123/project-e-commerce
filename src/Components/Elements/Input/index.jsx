import Label from "./Label"
import Input from "./Input"
import { forwardRef } from "react"

const InputForm = forwardRef((props, ref) => {
    const { type, placeholder, name, label } = props

    return (
        <div className="my-10">
            <Label htmlFor={name}>{label}</Label>
            <Input type={type} placeholder={placeholder} name={name} ref={ref}/>
        </div>
    )
})

export default InputForm