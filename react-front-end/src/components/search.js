import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';


export default function Search(props) {

  const [term, setTerm] = useState('');

  return (
    <div className="search" style={{ paddingRight: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '10px' }}>
          <TextField
            label="Players"
            style={{ backgroundColor: 'white', fontSize: "1em" }}
            variant="outlined"
            onChange={event => {
              const { value } = event.target;
              setTerm(value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                console.log('Enter key pressed', term);
                window.location.href = `/players/${term}`;
              }
            }
            } />
        </div>
        <Button variant="contained" style={{ backgroundColor: 'rgb(43, 107, 177)', marginLeft: '10px' }} href={`/players/${term}`} >
          <SearchIcon style={{ fontSize: '28px' }}></SearchIcon>
        </Button>
      </div>
    </div>
  );
}