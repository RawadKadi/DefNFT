import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Box,
  MenuItem,
  Select,
  TextareaAutosize,
  InputAdornment,
  IconButton,
  TextField,
  Card,
  FilledInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@material-ui/core";
import { AttachFile, Close as CloseIcon } from "@material-ui/icons";
export default (props) => {
    return(
  <Dialog open={!!Object.keys(props.job).length} fullWidth>
    <DialogTitle>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        Post Job
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>
    <DialogContent></DialogContent>
    <DialogActions></DialogActions>
  </Dialog>
  );
};
