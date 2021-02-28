### ClickScreen
```jsx
    const Button = require('../../buttons/Button').default;
    const [visible, setVisible] = React.useState(false)
    const toggleState = () => {
        setVisible(true)
        setTimeout(()=>{
           setVisible(false)
        }, 2000)
    }
    const Wrapper = ({ isVisible }) => (
        <>
            <Button onClick={toggleState}>
                Show ClickScreen
            </Button>
            {
                isVisible &&
                <ClickScreen 
                    visible={isVisible}
                />
            }
        </>
    );
    <Wrapper isVisible={visible} />
   
```
