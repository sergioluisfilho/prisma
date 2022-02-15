import app from "./index";

const PORT = 3333

app.listen(PORT, ()=>{
    console.log(`[${Date()}]: Server started at port ${PORT}`)
});