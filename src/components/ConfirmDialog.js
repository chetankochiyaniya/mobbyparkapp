import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React, { useState } from 'react'


function ConfirmDialog(props) {
    const {ConfirmDialog,setConfirmDialog} =props;
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Dialog open={ConfirmDialog}> 
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <Typography variant="h6">
                    {ConfirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {ConfirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button>NO</Button>
                <Button>YES</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
