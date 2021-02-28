### ModalAlert
```jsx

const Button = require('../../buttons/Button').default;
const ButtonBar = require('../../buttons/ButtonBar').default;

const Wrapper = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [isOpen2, setIsOpen2] = React.useState(false)
    const [isType, setIsType] = React.useState('error')
    const [isDismiss, setIsDismiss] = React.useState(true)

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
                    setIsType('success')
                    setIsDismiss(false)
                }
            }>
                Open Modal Alert Success
            </Button>
            <Button display="secondary" onClick={ () => {
                    setIsOpen(true)
                    setIsType('error')
                    setIsDismiss(true)
                }
            }>
                Open Modal Alert Error
            </Button>
            <Button display="secondary" onClick={ () => {
                    setIsOpen(true)
                    setIsType('warning')
                    setIsDismiss(true)
                }
            }>
                Open Modal Alert Warning
            </Button>
            <Button display="secondary" onClick={ () => {
                    setIsOpen(true)
                    setIsType('info')
                    setIsDismiss(false)
                }
            }>
                Open Modal Alert Info
            </Button>
            <Button display="secondary" onClick={ () => {
                    setIsOpen(true)
                    setIsType('info')
                    setIsDismiss(true)
                }
            }>
                Open Modal Alert Info with Custom Footer
            </Button>
        </ButtonBar>

        <br /><br />

        <ModalAlert
            title={ 'Modal Alert ' + isType }
            handleClose={ handleClose }
            handleOK={ handleOK }
            handleCancel={ handleCancel }
            // footer={ footer }
            isOpen={ isOpen }
            type={ isType }
            allowDismiss={ isDismiss }
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
        </ModalAlert>


        <ModalAlert
            title={ 'Modal Alert with Custom Footer' }
            handleClose={ handleClose2 }
            footer={ footer }
            isOpen={ isOpen2 }
            type={ isType }
            allowDismiss={ isDismiss }
            suppressConfirm
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
        </ModalAlert>

    </div>
);
};

<Wrapper />
```
