import { useForm, Controller, useFieldArray, useController } from 'react-hook-form';
// third party
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Slider,
    Select,
    MenuItem,
    FormControl,
    FormLabel,
    FormGroup,
    Paper,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@mui/material';
import MainCard from 'components/MainCard';
import { ErrorMessage } from '@hookform/error-message';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { DeleteFilled, DeleteTwoTone, UserAddOutlined } from '@ant-design/icons';
const options = ['A', 'B', 'C', 'D'];
const objOptions = [
    { value: 65, label: 'A' },
    { value: 66, label: 'B' },
    { value: 67, label: 'C' }
];
const myHelper = {
    email: {
        required: 'Email is Required',
        pattern: 'Invalid Email Address'
    }
};

function TMEditor() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Editor
                apiKey="7aldzccwzb51gk6brcck0jmqoro2v083535l9sxt29w6tsk4"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount'
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log} type="button">
                Log editor content
            </button>
        </>
    );
}
const Range = ({ control, type, name, label, multiple }) => (
    <Controller
        control={control}
        name={name}
        defaultValue={[0, 50]}
        render={({ field: { value, ...field } }) => <Slider {...field} marks max={100} min={0} step={5} value={value} />}
    />
);
const SelectAuto = ({ control, type, name, label, multiple }) => (
    <Controller
        control={control}
        name={name}
        defaultValue={multiple ? [objOptions[0]] : objOptions[0]}
        render={({ field: { onChange, ...field } }) => (
            <Autocomplete
                multiple={multiple}
                options={objOptions}
                defaultValue={multiple ? [objOptions[0]] : objOptions[0]}
                getOptionLabel={(option) => option.label}
                onChange={(_, data) => onChange(data)}
                renderInput={(params) => <TextField {...field} {...params} fullWidth label="object-complete" />}
            />
        )}
    />
);
const Text = ({ control, type, name, label, multiple, errorMessage }) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { isTouched, isDirty },
        formState: { touchedFields, dirtyFields, errors, isValid }
    } = useController({
        name,
        control,
        rules: { required: 'required' },
        defaultValue: ''
    });
    return (
        <>
            <TextField
                error={!!errors[name]}
                type={type}
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                value={value} // input value
                name={name} // send down the input name
                inputRef={ref} // send input ref, so we can focus on input when error appear
                label={label}
                helperText={errorMessage}
            />
            <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} />
        </>
    );
};
const Array = ({ control, type, name, label, multiple }) => {
    const {
        fields: members,
        append: appendMemberRow,
        remove: removeMemberRow
    } = useFieldArray({
        control,
        name
    });
    const addNewMemeber = () => appendMemberRow({ email: '', role: 'user' });
    return (
        <Paper elevation={3} style={{ padding: '.25rem 1rem 1rem 1rem' }}>
            <h4>Members</h4>
            {members.map((field, index) => (
                <Grid container key={field.id} spacing={1} alignItems="center" style={{ marginBottom: '1rem' }}>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            // must use . for the object key!!!
                            name={`${name}.${index}.email`}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} label="User Email" type="email" fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            control={control}
                            // must use . for the object key!!!
                            name={`members.${index}.role`}
                            defaultValue="user"
                            render={({ field }) => (
                                <Select {...field} label="user Type" fullWidth>
                                    <MenuItem value="user">Member</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button color="error" variant="outlined" onClick={() => removeMemberRow(index)} startIcon={<DeleteFilled />}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            ))}
            <Button variant="outlined" onClick={addNewMemeber} startIcon={<UserAddOutlined />}>
                Add
            </Button>
        </Paper>
    );
};
const RadioType = ({ control, type, name, label, multiple }) => (
    <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
            <RadioGroup {...field}>
                <FormControlLabel value="choice-1" control={<Radio />} label="A" />
                <FormControlLabel value="choice-2" control={<Radio />} label="B" />
                <FormControlLabel value="choice-3" control={<Radio />} label="C" />
                <FormControlLabel value="choice-4" control={<Radio />} label="D" />
            </RadioGroup>
        )}
    />
);
const Check = ({ control, type, name, label, multiple }) => (
    <Controller
        control={control}
        name={name}
        defaultValue={{}}
        render={({ field: { value, onChange, ...field } }) => (
            // <FormControlLabel control={<Checkbox onChange={onChange} checked={!!value} {...field} />} label="checkbox" />
            <>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Assign responsibility</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={value.gilad} onChange={(e) => (value.gilad = e.target.checked)} name="gilad" />}
                            label="Gilad Gray"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={value.jason} onChange={(e) => (value.jason = e.target.checked)} name="jason" />}
                            label="Jason Killian"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={value.antoine} onChange={(e) => (value.antoine = e.target.checked)} name="antoine" />
                            }
                            label="Antoine Llorca"
                        />
                    </FormGroup>
                </FormControl>
            </>
        )}
    />
);
const DropDown = ({ control, type, name, label, multiple }) => (
    <Controller
        control={control}
        name={name}
        defaultValue="A"
        render={({ field }) => (
            <Select {...field} fullWidth>
                <MenuItem value="A">Select 1</MenuItem>
                <MenuItem value="B">Select 2</MenuItem>
                <MenuItem value="C">Select 3</MenuItem>
                <MenuItem value="D">Select 4</MenuItem>
            </Select>
        )}
    />
);
function EcEditor({ control, type, name, label, multiple }) {
    const { field } = useController({
        name,
        control
    });

    const onChange = (text) => {
        field.onChange(text);
    };
    return (
        <>
            <SunEditor
                onChange={onChange}
                defaultValue={field.value}
                setOptions={{
                    buttonList: [
                        ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                        '/',
                        ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                        ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
                    ]
                }}
            />
            {/* <TMEditor /> */}
        </>
    );
}
function EYFormField(props) {
    let ReturnType = null;

    switch (props.type) {
        case 'text':
            ReturnType = Text;
            break;
        case 'array':
            ReturnType = Array;
            break;
        case 'slider':
            ReturnType = Range;
            break;
        case 'selectAuto':
            ReturnType = SelectAuto;
            break;
        case 'select':
            ReturnType = DropDown;
            break;
        case 'radio':
            ReturnType = RadioType;
            break;
        case 'check':
            ReturnType = Check;
            break;
        case 'editor':
            ReturnType = EcEditor;
            break;
        default:
            break;
    }
    return ReturnType ? <ReturnType {...props} /> : null;
}
export default function FormPage() {
    const { control, handleSubmit } = useForm();

    console.count('app rerender');

    const handleOnSubmit = (evt) => {
        console.log(evt);
    };
    // const watchAll = watch();
    // console.log(watchAll, errors);

    return (
        <>
            <MainCard title="Sample Form">
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="text" name="username" label="User Name" errorMessage="Name is requried" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="select" name="select" label="Select" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="selectAuto" name="selectAuto" label="Select Auto" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="selectAuto" name="letters" label="Letter Selector" multiple />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="check" name="letter2" label="Letter Radio" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="radio" name="letter3" label="Letter Radio" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="slider" name="slider" label="Slider" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="text" name="email2" label="Email" errorMessage="Email is requried" />
                        </Grid>
                        <Grid item xs={12}>
                            <EYFormField control={control} type="array" name="members" label="Members" />
                        </Grid>
                        <Grid item xs={12}>
                            <EYFormField control={control} type="editor" name="editor" label="Editor" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
            {/* <MainCard title="Sample Form">
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="text" name="username" label="User Name" errorMessage="Name is requried" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="select" name="select" label="Select" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="selectAuto" name="selectAuto" label="Select Auto" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="selectAuto" name="letters" label="Letter Selector" multiple />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="check" name="letter2" label="Letter Radio" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="radio" name="letter3" label="Letter Radio" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="slider" name="slider" label="Slider" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="text" name="email2" label="Email" errorMessage="Email is requried" />
                        </Grid>
                        <Grid item xs={12}>
                            <EYFormField control={control} type="array" name="members" label="Members" />
                        </Grid>
                        <Grid item xs={12}>
                            <EYFormField control={control} type="editor" name="editor" label="Editor" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
            <MainCard title="Sample Form">
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="text" name="username" label="User Name" errorMessage="Name is requried" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="select" name="select" label="Select" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="selectAuto" name="selectAuto" label="Select Auto" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="selectAuto" name="letters" label="Letter Selector" multiple />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="check" name="letter2" label="Letter Radio" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="radio" name="letter3" label="Letter Radio" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="slider" name="slider" label="Slider" />
                        </Grid>
                        <Grid item xs={6}>
                            <EYFormField control={control} type="text" name="email2" label="Email" errorMessage="Email is requried" />
                        </Grid>
                        <Grid item xs={12}>
                            <EYFormField control={control} type="array" name="members" label="Members" />
                        </Grid>
                        <Grid item xs={12}>
                            <EYFormField control={control} type="editor" name="editor" label="Editor" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </MainCard> */}
        </>
    );
}
