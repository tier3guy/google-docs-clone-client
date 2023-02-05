const TOOLBAR_OPTIONS = [

    ['bold', 'italic', 'underline', 'strike'],
    [{ font: [] }],                                   // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ header: [1, 2, 3, 4, 5, 6, false] }],          // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ["image", "blockquote", "code-block"],
    ['link', 'video']
    [{ 'align': [] }],
  
    ['clean']       

    
];

export default TOOLBAR_OPTIONS;
