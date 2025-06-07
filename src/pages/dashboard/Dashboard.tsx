import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/appointments/new')}
        >
          New Appointment
        </Button>
      </Box>
      
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, 
          gap: 3, 
          mt: 3 
        }}
      >
        <Paper sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Upcoming Appointments</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            You have no upcoming appointments.
          </Typography>
          <Button 
            variant="text" 
            onClick={() => navigate('/appointments')}
            sx={{ mt: 1 }}
          >
            View All Appointments
          </Button>
        </Paper>
        
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Recent Activity</Typography>
          <Typography variant="body2" color="text.secondary">
            No recent activity to display.
          </Typography>
        </Paper>
        
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Quick Actions</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={() => navigate('/appointments/new')}
            >
              Schedule New Appointment
            </Button>
            <Button 
              variant="outlined" 
              fullWidth
              onClick={() => navigate('/appointments')}
            >
              View Calendar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
