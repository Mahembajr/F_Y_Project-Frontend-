// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, Typography } from '@mui/material';

// const Assistance = () => {
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/api/assistance/')
//       .then(response => {
//         setOptions(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching assistance options:', error);
//       });
//   }, []);

//   return (
//     <div>
//       {options.map(option => (
//         <Card key={option.id} sx={{ marginBottom: 2 }}>
//           <CardContent>
//             <Typography variant="h5" component="div">
//               {option.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {option.description}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Contact: {option.contact_info}
//             </Typography>
            
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Assistance;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Toolbar, Container } from '@mui/material';

const Assistance = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/api/assistance/')
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching assistance options:', error);
      });
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      {/* Add the Toolbar to create space for the fixed header */}
      <Toolbar />

      {options.map(option => (
        <Card key={option.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {option.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {option.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact: {option.contact_info}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Assistance;
