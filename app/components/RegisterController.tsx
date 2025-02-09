// import { useState } from "react"
import { RegisterView } from "./RegisterView";

export const RegisterController = () => {
    // const [formData, setFormData] = useState({
    //     name: "",
    //     lastName: "",
    //     email: "",
    //     fiscalKey: "",
    //     fiscalKeyRepeat: ""
    // })
    // const [loading, setLoading] = useState<boolean>(false);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);
        
    //     // Aca hacer la logica de enviar el mail con los datos
    // };

    return (
        <RegisterView 
            // formData={formData}
            // setFormData={setFormData}
            // loading={loading}
            // handleChange={handleChange}
            // handleSubmit={handleSubmit}
        />
    )
}