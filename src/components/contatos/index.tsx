import { useContext, useEffect, useState } from "react";
import Container from "../container";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext"
import Pagination from "../pagination";


function Contatos() {
    const { fetchContacts, contacts } = useContext(AuthContext);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPage = 10;

    //calculando item pagina 
    const indexOfLastItem = currentPage * itemsPage;
    const indexOfFirstItem = indexOfLastItem - itemsPage
    const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

    // Mudar a página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        async function handleContatos() {
            await fetchContacts()
        }

        handleContatos();
    }, [])

    function handleNavigate(id: string) {
        navigate(`/contact/${id}`)
    }

    return (
        <div className="w-full mt-3 px-4 xl:px-0" >
            <Container>
                <Card>
                    <CardHeader>
                    </CardHeader>
                    <CardContent  >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center" >Nome</TableHead>
                                    <TableHead className="text-center" >Contato</TableHead>
                                    <TableHead className="text-center hidden md:block">email</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody  >
                                {currentContacts.map((item) => (
                                    <TableRow key={item.identity} onClick={() => handleNavigate(item.identity)} className="cursor-pointer"  >
                                        <TableCell className="text-center" >{item.name}</TableCell>
                                        <TableCell className="text-center" >{item.phoneNumber}</TableCell>
                                        <TableCell className="text-center hidden md:block">{item.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>

                    <CardFooter>
                        <Pagination
                            itemsPerPage={itemsPage}
                            totalItems={contacts.length}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </CardFooter>
                </Card>
            </Container>
        </div >
    )
}

export default Contatos;