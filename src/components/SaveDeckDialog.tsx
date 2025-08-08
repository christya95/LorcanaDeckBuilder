import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export default function SaveDeckDialog({ open, onClose, onSave }:{ open:boolean; onClose:()=>void; onSave:(name:string)=>void }) {
  const [name, setName] = useState("");
  useEffect(()=>{ if(open) setName(""); }, [open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Deck</DialogTitle>
      <DialogContent>
        <TextField autoFocus fullWidth label="Deck name" value={name} onChange={(e)=>setName(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={()=>{ onSave(name.trim() || "My Deck"); onClose(); }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
