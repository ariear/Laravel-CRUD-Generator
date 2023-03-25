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
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Prism from 'prismjs'
import "prismjs/components/prism-php";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Typography component="span">{children}</Typography>
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
  const [columns, setColumns] = useState([
    {
      no : 1,
      title: '',
      data_title: '',
      element: '',
      validator: ''
    }
  ])
  const [model, setModel] = useState('')
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
    toast.success('Generate Successfully!!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const newColumn = [...columns]
    newColumn[index][name] = value
    setColumns(newColumn)
  }

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <Head>
        <title>Laravel CRUD Generator</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className="xl:w-[1000px] sm:w-[90vw] w-[95vw] mx-auto border-2 font-poppins">
        <p className="text-3xl font-semibold py-8">Laravel CRUD Generator</p>
        <ToastContainer />
        <form onSubmit={handleGenerate} className="bg-white p-4 shadow-lg rounded">
          <div className="mb-8">
            <p className="text-sm mb-1">Model Name</p>
            <Input placeholder="ex: User" required value={model} onChange={(e) => setModel(e.target.value)} />
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
                        <Input placeholder="input title" className="font-poppins text-sm w-[180px]" name="title" value={column.title} onChange={(e) => handleInputChange(e, index)} required />
                      </TableCell>
                      <TableCell align="left">
                        <Input placeholder="input data title" className="font-poppins text-sm w-[180px]" name="data_title" value={column.data_title} onChange={(e) => handleInputChange(e, index)} required />
                      </TableCell>
                      <TableCell align="left">
                      <FormControl className="w-[170px]">
                        <InputLabel id="demo-simple-select-label">Element</InputLabel>
                        <Select
                          required
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={column.element}
                          label="Element"
                          name="element" onChange={(e) => handleInputChange(e, index)}
                        >
                          <MenuItem value={'string'}>Input Text</MenuItem>
                          <MenuItem value={'integer'}>Input Number</MenuItem>
                          <MenuItem value={'enum'}>Select</MenuItem>
                          <MenuItem value={'text'}>Textarea</MenuItem>
                        </Select>
                      </FormControl>
                      </TableCell>
                      <TableCell align="left">
                        <Input placeholder="input validator" className="font-poppins text-sm w-[180px]" name="validator" value={column.validator} onChange={(e) => handleInputChange(e, index)} required />
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
                  <p className="font-poppins text-sm font-medium mb-2">Command</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto"><code className="language-prism-php">php artisan make:model {model} -mcr</code></pre>

                  <p className="font-poppins text-sm font-medium mb-2">Route</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`use App\\Http\\Controllers\\${model}Controller; 

Route::resource('/${model.toLowerCase()}', ${model}Controller::class);`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">{model}Controller</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`<?php

namespace App\\Http\\Controllers;

use App\\Models\\${model};
use Illuminate\\Http\\Request;

class ${model}Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('${model.toLowerCase()}.index', [
            '${model.toLowerCase()}' => ${model}::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('${model.toLowerCase()}.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            ${columns.map(column => `'${column.data_title}' => '${column.validator}', \n`).join('')}
        ]);

        ${model}::create($validate);

        return redirect('/${model.toLowerCase()}');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $${model.toLowerCase()} = ${model}::find($id);

        if (!$${model.toLowerCase()}) {
            return redirect('/${model.toLowerCase()}');
        }

        return view('${model.toLowerCase()}.edit',[
            '${model.toLowerCase()}' => $${model.toLowerCase()}
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $${model.toLowerCase()} = ${model}::find($id);

        if (!$${model.toLowerCase()}) {
            return redirect('/${model.toLowerCase()}');
        }

        $validate = $request->validate([
          ${columns.map(column => `'${column.data_title}' => '${column.validator}', \n`).join('')}
        ]);

        $${model.toLowerCase()}->update($validate);

        return redirect('/${model.toLowerCase()}');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $${model.toLowerCase()} = ${model}::find($id);

        if (!$${model.toLowerCase()}) {
            return redirect('/${model.toLowerCase()}');
        }

        $${model.toLowerCase()}->delete();

        return redirect('/${model.toLowerCase()}');
    }
}
`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">Model</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                    {`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class ${model} extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = '${model.toLowerCase()}';
}
`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">Migration</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                    {`<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('${model.toLowerCase()}', function (Blueprint $table) {
            $table->id();
            ${columns.map(column => `$table->${column.element}('${column.data_title}'${column.element === 'enum' ? ',[opt1, opt2]' : ''}); \n`).join('')}
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('${model.toLowerCase()}');
    }
};
`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">Index Table</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`<table class="table table-striped container mt-5">
  <thead>
    <tr>
<th scope="col">No</th>
${columns.map(column => `<th scope="col">${column.title}</th> \n`).join('')}
<th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  @forelse ($${model.toLowerCase()} as $item)
      <tr>
          <th scope="row">{{$loop->iteration}}</th>
          ${columns.map(column => `<td>{{$item->${column.data_title}}}</td> \n`).join('')}
          <td>
              <a href="/${model.toLowerCase()}/{{$item->id}}/edit" class="btn btn-warning">Edit</a>
              <form action="/${model.toLowerCase()}/{{$item->id}}" method="post" class="d-inline" >
              @method('DELETE')
              @csrf
              <button type="submit" class="btn btn-danger" >Delete</button>
              </form>
          </td>
      </tr>
  @empty
      <tr>
          <td>${model} not found</td>
      </tr>
  @endforelse
  </tbody>
</table>`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">Create Form</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`<form method="POST" action="/${model.toLowerCase()}" class="container mt-5">
    @csrf
    {
${columns.map(column => `<div class="mb-3">
<label for="${column.data_title}" class="form-label">${column.title}</label>
<input type="text" name="${column.data_title}" class="form-control" id="${column.data_title}" placeholder="write ${column.data_title} here">
</div> \n`).join('')}
    }
    <button type="submit" class="btn btn-primary">Save</button>
</form>`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">Edit Form</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`<form method="POST" action="/${model.toLowerCase()}/{{$${model.toLowerCase()}->id}}" class="container mt-5">
    @method('PUT')
    @csrf
${columns.map(column => `<div class="mb-3">
<label for="${column.data_title}" class="form-label">${column.title}</label>
<input type="text" name="${column.data_title}" value="{{$${model.toLowerCase()}->${column.data_title}}}" class="form-control" id="${column.data_title}" placeholder="write ${column.data_title} here">
</div> \n`).join('')}
    <button type="submit" class="btn btn-primary">Save</button>
</form>`}
                    </code>
                  </pre>
              </TabPanel>
              <TabPanel value={valueTabs} index={1}>
                  <p className="font-poppins text-sm font-medium mb-2">Command</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto"><code className="language-prism-php">php artisan make:model {model} -mcr</code></pre>

                  <p className="font-poppins text-sm font-medium mb-2">Route *api.php</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`use App\\Http\\Controllers\\${model}Controller; 

Route::resource('/${model.toLowerCase()}', ${model}Controller::class);`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">{model}Controller</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`<?php

namespace App\\Http\\Controllers;

use App\\Models\\${model};
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Validator;

class ${model}Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'data' => ${model}::all()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            ${columns.map(column => `'${column.data_title}' => '${column.validator}', \n`).join('')}
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $${model.toLowerCase()} = ${model}::create([
            ${columns.map(column => `'${column.data_title}' => $request->${column.data_title}, \n`).join('')}
        ]);

        if ($${model.toLowerCase()}) {
            return response()->json([
                'message' => 'Success Add ${model}',
                'data' => $${model.toLowerCase()}
            ], 201);
        }

        return response()->json([
            'message' => 'Fail Add ${model}'
        ], 409);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $${model.toLowerCase()} = ${model}::find($id);

        if (!$${model.toLowerCase()}) {
            return response()->json([
                'message' => '${model} not found'
            ], 404);
        }

        return response()->json([
            '${model.toLowerCase()}' => $${model.toLowerCase()}
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $${model.toLowerCase()} = ${model}::find($id);

        if (!$${model.toLowerCase()}) {
            return response()->json([
                'message' => '${model} not found'
            ], 404);
        }

        $validate = Validator::make($request->all(), [
            ${columns.map(column => `'${column.data_title}' => '${column.validator}', \n`).join('')}
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $data = $${model.toLowerCase()}->update([
            ${columns.map(column => `'${column.data_title}' => $request->${column.data_title}, \n`).join('')}
        ]);

        if ($data) {
            return response()->json([
                'message' => 'Success Update ${model}',
                'data' => $data
            ], 200);
        }

        return response()->json([
            'message' => 'Fail Update ${model}'
        ], 409);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $${model.toLowerCase()} = ${model}::find($id);

        if (!$${model.toLowerCase()}) {
            return response()->json([
                'message' => '${model} not found'
            ], 404);
        }

        $${model.toLowerCase()}->delete();

        response()->json([
            'message' => 'Success Delete ${model}'
        ], 200);
    }
}
`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">Model</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class ${model} extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = '${model.toLowerCase()}';
}
`}
                    </code>
                  </pre>

                  <p className="font-poppins text-sm font-medium mb-2">Migration</p>
                  <pre className="bg-[#343541] p-4 rounded-md mb-6 overflow-auto">
                    <code className="language-prism-php">
                      {`<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('${model.toLowerCase()}', function (Blueprint $table) {
            $table->id();
            ${columns.map(column => `$table->${column.element}('${column.data_title}'${column.element === 'enum' ? ',[opt1, opt2]' : ''}); \n`).join('')}
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('${model.toLowerCase()}');
    }
};
`}
                    </code>
                  </pre>
              </TabPanel>
            </>
        }
        </form>
      </div>
    </>
  )
}