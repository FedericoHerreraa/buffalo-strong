
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

export const SendUserCredentials = ({
    form,
    setForm,
    setShowNext
}: {
    form: { 
        name: string;
        email: string;
        password: string;
        cuit: string;
        address: string; 
    };
    setForm: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        password: string;
        cuit: string;
        address: string;
    }>>;
    setShowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [email, setEmail] = useState({
        to: "",
        subject: "",
        body: ""
    })

    const [loading, setLoading] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [passwordCopied, setPasswordCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        if (text.includes('@')) setEmailCopied(true);
        else setPasswordCopied(true);

        setTimeout(() => {
            if (text.includes('@')) setEmailCopied(false);
            else setPasswordCopied(false);
        }, 3000); 
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    };

    const sendEmail = async () => {
        setLoading(true);
        const res = await fetch('/api/send-credentials-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        });
    
        const result = await res.json();
        if (result.success) {
            setLoading(false);
            console.log("Correo enviado con éxito:", result.data);
        }


        setShowNext(false);
        setEmail({
            to: "",
            subject: "",
            body: ""
        });
        setForm({
            name: "",
            email: "",
            password: "",
            cuit: "",
            address: ""
        });

        setLoading(false);
    }

    return (
        <div className="w-1/3">
            <h2 className="text-2xl font-semibold mb-5">
                Enviar credenciales por email al usuario
            </h2>
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="email" className="text-zinc-700 ml-1">
                        Para
                    </label>
                    <input
                        value={email.to}
                        onChange={handleEmailChange}
                        placeholder="nombre@servicio.com"
                        type="email"
                        name="to"
                        className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-zinc-700 ml-1">
                        Asunto
                    </label>
                    <input
                        value={email.subject}
                        onChange={handleEmailChange}
                        placeholder="Mensaje de bienvenida"
                        type="email"
                        name="subject"
                        className="w-full mt-2 bg-zinc-100 px-4 py-2 rounded-lg text-zinc-800 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <p className="bg-zinc-100 p-2 rounded-lg text-zinc-700 w-fit">
                            {form.email}
                        </p>
                            {emailCopied ? (
                                <IoMdCheckmark className="text-green-500 text-xl" />
                            ) : (
                                <IoCopyOutline
                                    className="cursor-pointer text-xl"
                                    onClick={() => handleCopy(form.email)}
                                />
                            )}
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="bg-zinc-100 p-2 rounded-lg text-zinc-700 w-fit">
                            {form.password}
                        </p>
                        {passwordCopied ? (
                            <IoMdCheckmark className="text-green-500 text-xl" />
                        ) : (
                            <IoCopyOutline
                                className="cursor-pointer text-xl"
                                onClick={() => handleCopy(form.password)}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-zinc-700 ml-1">
                        Cuerpo del mensaje
                    </label>
                    <textarea
                        value={email.body}
                        onChange={handleEmailChange}
                        className="bg-zinc-100 rounded-lg"
                        name="body"
                        rows={5}
                        cols={30}
                    />
                </div>
                <button
                    onClick={sendEmail}
                    type="button"
                    className="bg-zinc-700 w-[200px] hover:text-white py-2 rounded-lg text-zinc-200"
                >
                    {loading ? 'Enviando...' : 'Enviar email'}
                </button>
            </div>
        </div>
    );
};
