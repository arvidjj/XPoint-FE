import { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Button, 
  Box,
  Card,
  CardContent,
  CardActionArea,
  Container,
  styled
} from '@mui/material';

const TimeSlotGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  gap: '16px',
  width: '100%',
  marginTop: '16px'
});

const TimeSlotItem = styled('div')({
  width: '100%'
});
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

const avaliableTimes: String[] = [
    "14:00", "16:00", "18:00", "20:00"
]

const Reserva = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<String | null>(null);
  const [timeSlots, setTimeSlots] = useState<String[]>([]);

  const [reservado, setReservado] = useState<boolean>(false);

  // Filter out weekends and past dates
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
    if (date) {
      setTimeSlots(avaliableTimes);
    } else {
      setTimeSlots([]);
    }
  };

  const handleTimeSelect = (time: String) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      alert(`Reserva confirmada para el ${format(selectedDate, 'PP')} a las ${selectedTime}`);
      const reserva = {
        date: selectedDate,
        time: selectedTime
      }
      console.log(reserva);
      setReservado(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Reserva tu cita
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DatePicker
              label="Selecciona una fecha"
              value={selectedDate}
              onChange={handleDateChange}
              shouldDisableDate={isWeekend}
              minDate={new Date()}
              maxDate={addDays(new Date(), 30)}
              slotProps={{ textField: { fullWidth: true } }}
              disabled={reservado}
            />
          </LocalizationProvider>
        </Box>

        {selectedDate && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Horarios disponibles para el {format(selectedDate, 'PP', { locale: es })}
            </Typography>
            <TimeSlotGrid>
              {timeSlots.map((time, index) => (
                <TimeSlotItem key={index}>
                  <Card 
                    variant={selectedTime === time ? 'elevation' : 'outlined'}
                    elevation={selectedTime === time ? 3 : 0}
                  >
                    <CardActionArea 
                      onClick={() => handleTimeSelect(time)}
                      sx={{ height: '100%' }}
                      disabled={reservado}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="body1">
                          {time}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimeSlotItem>
              ))}
            </TimeSlotGrid>
          </Box>
        )}

        {selectedTime && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={handleSubmit}
              sx={{ px: 4 }}
              disabled={reservado}
            >
              Confirmar reserva para {selectedTime}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Reserva;
