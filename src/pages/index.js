import { Input, 
  TableContainer, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  Box,
  Tab,
  Tabs,
  Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Head from "next/head";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [element, setElement] = useState('')
  const [columns, setColumns] = useState([
    {
      no : 1,
      title: '',
      data_title: '',
      element: '',
      validator: ''
    }
  ])
  const [isGenerate, setIsGenerate] = useState(false)

  const [valueTabs, setValueTabs] = useState(0)

  const handleAddColumn = () => {
    setColumns([...columns, {
      no : uuidv4(),
      title: '',
      data_title: '',
      element: '',
      validator: ''
    }]) 
  }

  const handleDeleteColumn = (no) => {
    const newColumn = columns.filter(column => column.no !== no)
    setColumns(newColumn)
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    setIsGenerate(true)
  }

  return (
    <>
      <Head>
        <title>Laravel CRUD Generator</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className="xl:w-[950px] w-[90vw] mx-auto border-2 font-poppins">
        <p className="text-3xl font-semibold py-8">Laravel CRUD Generator</p>

        <form onSubmit={handleGenerate} className="bg-white p-4 shadow-lg rounded">
          <div className="mb-8">
            <p className="text-sm mb-1">Model Name</p>
            <Input placeholder="ex: User" required />
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
                {
                  columns.map((column, index) => 
                    <TableRow
                      key={column.no}
                      sx={{ 'td, th': { border: 1, borderColor: '#D8D8D8' } }}
                    >
                      <TableCell component="th" scope="row" className="font-poppins text-sm">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">
                        <Input placeholder="input title" className="font-poppins text-sm" required />
                      </TableCell>
                      <TableCell align="left">
                        <Input placeholder="input data title" className="font-poppins text-sm" required />
                      </TableCell>
                      <TableCell align="left">
                      <FormControl className="w-[170px]">
                        <InputLabel id="demo-simple-select-label">Element</InputLabel>
                        <Select
                          required
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
                        <Input placeholder="input validator" className="font-poppins text-sm" required />
                      </TableCell>
                      <TableCell align="left">
                        <DeleteIcon color="error" onClick={() => handleDeleteColumn(column.no)} />
                      </TableCell>
                    </TableRow>
                    )
                }
              </TableBody>
            </Table>
        </TableContainer>
        <div className="mt-4 flex justify-end items-center mb-8">
          <Button variant="contained"  className="bg-blue-400 mr-3 capitalize" onClick={handleAddColumn} >Add Column</Button>
          <Button variant="contained" className="bg-green-500 capitalize" type="submit" >Generate</Button>
        </div>
        {
          isGenerate &&
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueTabs} onChange={(event, newValueTabs) => setValueTabs(newValueTabs)} aria-label="basic tabs example">
                  <Tab className="capitalize font-poppins" label="Basic" {...a11yProps(0)} /> 
                  <Tab className="capitalize font-poppins" label="Rest Api" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={valueTabs} index={0}>
                Item One
              </TabPanel>
              <TabPanel value={valueTabs} index={1}>
                Item Two
              </TabPanel>
            </>
        }
        </form>
      </div>
    </>
  )
}