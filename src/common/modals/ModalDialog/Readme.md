### ModalDialog
```jsx

const Button = require('../../buttons/Button').default;
const ButtonBar = require('../../buttons/ButtonBar').default;

const Wrapper = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [isOpen2, setIsOpen2] = React.useState(false)

    const handleOK = () => {
    setIsOpen(false)
    }

    const handleCancel = () => {
    setIsOpen(false)
    }

    const handleClose = () => {
    setIsOpen(false)
    }


    const handleOK2 = () => {
    setIsOpen2(false)
    }

    const handleCancel2 = () => {
    setIsOpen2(false)
    }

    const handleClose2 = () => {
    setIsOpen2(false)
    }

    const handleCustom = () => {
    alert('nyuk, nyuk, nyuk')
    setIsOpen2(false)
    }

    const footer = (
    <ButtonBar>
        <Button display="secondary" onClick={ handleCancel2 }>
            Larry
        </Button>
        <Button display="secondary" onClick={ handleOK2 }>
            Mo
        </Button>
        <Button display="secondary" onClick={ handleCustom }>
            Curly
        </Button>
    </ButtonBar>
    )


    return(
        <div className="test-modal">

        <ButtonBar>
            <Button display="secondary" onClick={ () => {
                    setIsOpen(true)
                }
            }>
                Open ModalX Dialog
            </Button>
             <Button display="secondary" onClick={ () => {
                    setIsOpen2(true)
                }
            }>
                Open ModalX Dialog with custom Footer
            </Button>
        </ButtonBar>

        <br /><br />
            <ModalDialog
                title={ 'Modal X' }
                handleClose={ handleClose }
                handleOK={ handleOK }
                handleCancel={ handleCancel }
                isOpen={ isOpen }
                size={ 'small' }
            >
                <div className="test-modal-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
            </ModalDialog>

            <ModalDialog
                title="Modal X with Custom Footer"
                handleClose={ handleClose2 }
                isOpen={ isOpen2 }
                footer={ footer }
            >
                <div className="test-modal-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                    <br /><br />
                </div>
            </ModalDialog>


    </div>
);
};

<Wrapper />
```
