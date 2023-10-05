import { Box } from "@mui/material";

export default function BoxDisplay() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
        <Box sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}>
          98.3 K
        </Box>
        
      </Box>
    </>
  );
}
