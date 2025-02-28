import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import './App.css'

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: number | null;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const [character, setCharacter] = useState({})

  useEffect(() => {
    if (selectedValue) {
      fetch(`https://rickandmortyapi.com/api/character/${selectedValue}`)
      .then(response => response.json())
      .then(result => {
        setCharacter(result)
      })
    }
  }, [selectedValue])

  if (!selectedValue) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Информация о персонаже:</DialogTitle>
      <div className="character">
        <div>name: {character.name}</div>
        <div>gender: {character.gender}</div>
        <img
          srcSet={`${character.image}`}
          src={`${character.image}`}
          alt={character.name}
          loading="lazy"
      />
      </div>
    </Dialog>
  );
}

function App() {
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleClick = () => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(response => response.json())
      .then(result => {
        setList(result.results)
      })
  }

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setSelectedValue(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedValue(null);
  }

  return (
    <>
      <div className="card">
        <List className="list">
          {list.map((item) => (
            <ListItem disablePadding key={item.id}>
              <ListItemButton onClick={() => handleClickOpen(item.id)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>))}
        </List>
      </div>
      <div className="card">
        <button className="button" onClick={handleClick}>
          click
        </button>
      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  )
}

export default App
