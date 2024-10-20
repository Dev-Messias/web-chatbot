import Container from "@/components/container";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext"


function DetailContact() {
    const { fetchMessages, messages } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();


    async function handleMsg(id: string | undefined) {
        await fetchMessages({ id });
    }


    useEffect(() => {
        handleMsg(id)

    }, [])

    return (
        <div className=" w-full h-screen bg-slate-50" >
            <Header />
            <Container>
                <div className="w-full flex text-xl flex-row items-center justify-start mt-4 px-4 cursor-pointer" onClick={() => navigate('/home')}>
                    <ChevronLeft />
                    <h1 className="font-semibold" >Mensagens</h1>
                </div>
                <ScrollArea className=" border w-full h-[480px] md:h-[560px] xl:h-[700px] rounded-md mt-5 px-4 py-5">
                    <ul className="flex flex-col gap-4" >
                        {messages.map((message) => (

                            <>
                                {message.direction === 'received' ?

                                    <div key={message.id} className=" w-full flex flex-col items-start  " >
                                        <li className=" text-start text-base bg-white shadow-lg font-medium  rounded-lg px-2 py-2  " dangerouslySetInnerHTML={{ __html: message.content }}  >

                                        </li>
                                    </div>

                                    :

                                    <div key={message.id} className=" w-full flex flex-col items-end  " >
                                        <li className="  text-end text-base bg-sky-700 text-white font-medium shadow-lg  rounded-lg px-2 py-2" dangerouslySetInnerHTML={{ __html: message.content }}  >

                                        </li>
                                    </div>

                                }

                            </>
                        ))}
                    </ul>
                </ScrollArea>


            </Container>
        </div>
    )
}

export default DetailContact;