import { Input, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [element, setElement] = useState('')

  return (
    <>
      <Head>
        <title>Laravel CRUD Generator</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className="xl:w-[950px] w-[90vw] mx-auto border-2 font-poppins">
        <p className="text-3xl font-semibold py-8">Laravel CRUD Generator</p>

        <div className="bg-white p-4 shadow-lg rounded">
          <div className="mb-8">
            <p className="text-sm mb-1">Model Name</p>
            <Input placeholder="ex: User" className="" />
          </div>

          <TableContainer>
            <Table>
              <TableHead className="bg-[#F5F7FB]">
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 1, borderColor: '#D8D8D8' } }}
                >
                  <TableCell className="font-poppins">No</TableCell>
                  <TableCell align="left">
                    <p className="font-poppins font-medium">Title</p>
                    <p className="text-xs">ex: Full Name</p>
                  </TableCell>
                  <TableCell align="left">
                    <p className="font-poppins font-medium">Data Title</p>
                    <p className="text-xs">ex: full_name</p>
                  </TableCell>
                  <TableCell align="left">
                    <p className="font-poppins font-medium">Element</p>
                    <p className="text-xs">ex: Input Text</p>
                  </TableCell>
                  <TableCell align="left">
                    <p className="font-poppins font-medium">Validator</p>
                    <p className="text-xs">ex: required|min:30</p>
                  </TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 1, borderColor: '#D8D8D8' } }}
                  >
                    <TableCell component="th" scope="row" className="font-poppins text-sm">
                      1
                    </TableCell>
                    <TableCell align="left">
                      <Input placeholder="input title" className="font-poppins text-sm" />
                    </TableCell>
                    <TableCell align="left">
                      <Input placeholder="input data name" className="font-poppins text-sm" />
                    </TableCell>
                    <TableCell align="left">
                    <FormControl className="w-[170px]">
                      <InputLabel id="demo-simple-select-label">Element</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={element}
                        label="Element"
                        onChange={(e) => setElement(e.target.value)}
                      >
                        <MenuItem value={10}>Input Text</MenuItem>
                        <MenuItem value={20}>Input Number</MenuItem>
                        <MenuItem value={30}>Select</MenuItem>
                        <MenuItem value={30}>Textarea</MenuItem>
                      </Select>
                    </FormControl>
                    </TableCell>
                    <TableCell align="left">
                      <Input placeholder="input validator" className="font-poppins text-sm" />
                    </TableCell>
                    <TableCell align="left">
                      <DeleteIcon color="error" />
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
        </TableContainer>
        <div className="mt-4 flex justify-end items-center">
          <Button variant="contained"  className="bg-blue-400 mr-3 capitalize" >Add Column</Button>
          <Button variant="contained" className="bg-green-500 capitalize" >Generate</Button>
        </div>
        </div>
      </div>
    </>
  )
}