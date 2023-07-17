'use client'
import React, { useState } from "react"
import { AppBar, Box, Button, Card, CardContent, Container, IconButton, List, ListItem, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskEdit, setTaskEdit] = useState(-1);
  const ALPHA_NUMERIC = /^[a-zA-Z0-9-\s]+$/;

  const submitHandler = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (event.target.task.value) {
      setTasks([...tasks, event.target.task.value])
    }
    event.target.reset()
  }

  const updateHandler = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()
    if (event.target.task.value) {
      const arr: Array<string> = [...tasks]
      arr[taskEdit] = event.target.task.value
      setTasks(arr)
    }
    setTaskEdit(-1)
    event.target.reset()
  }

  const editHandler = (i: number) => { 
    setTaskEdit(i);
  }

  const inputValidation = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!ALPHA_NUMERIC.test(event.key)) {
      event.preventDefault();
    }
  }

  return (
    <>
      <Container maxWidth="sm">
        <AppBar>
          <Toolbar sx={{justifyContent: "center"}}>
            <Typography variant="h4">Task List App</Typography>
          </Toolbar>
        </AppBar>
        <Box marginTop={10}>
          <Card>
            <CardContent>
              {taskEdit >= 0 ? (
                <form onSubmit={updateHandler}>
                <Stack spacing={2}>
                  <TextField variant="outlined" size="small" type="text" name="task" autoComplete="off" />
                  <Button variant="contained" type="submit" color="warning">Update</Button>
                </Stack>
              </form>
              ):(
                <form onSubmit={submitHandler}>
                  <Stack spacing={2}>
                    <TextField variant="outlined" size="small" type="text" name="task" autoComplete="off" onKeyDown={inputValidation} />
                    <Button variant="contained" type="submit">Create</Button>
                  </Stack>
                </form>
              )}
              
            </CardContent>
          </Card>
        </Box>
        <Box marginTop={2}>
          <Card>
            <CardContent>
            <List>
              {tasks.length == 0 && (
                <ListItem>
                  <ListItemText primary="No Task List" />
                </ListItem>
              )}
              {tasks?.map((task, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <>
                      <IconButton edge="start" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => editHandler(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setTasks(tasks.filter((v: any, i: number) => i != index))}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  >
                    <ListItemText primary={task} />
                  </ListItem>
              ))}
            </List>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  )
}
