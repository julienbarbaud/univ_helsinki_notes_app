const express = require("express")
const cors = require("cors")

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

let maxId = 3;

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

app.get("/", (request, response) => response.send("heya\n try connecting to /api/notes to see my noodz"))

app.get("/api/notes", (request, response) => response.json(notes))

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id
  const note = notes.find((note)=>note.id===id)
  if (note) response.json(note)
  else response.status(404).end()
})

app.delete("/api/notes/:id", (request, response) => {
  notes = notes.filter(note=>note.id !== request.params.id)
  response.status(204).end()
})

app.post("/api/notes", (request, response) => {
  const data = request.body
  console.log("recevied post request with data ", data)
  data.id = ++maxId
  notes.push(data)
  response.json(data)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>console.log(`application running on port ${PORT}`))

