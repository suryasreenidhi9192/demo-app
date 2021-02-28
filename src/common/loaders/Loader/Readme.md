### Loader
```jsx
    const Button = require('../../buttons/Button').default;
    const [loading, setLoading] = React.useState(false)
    const toggleState = () => {
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 5000)
    }
    const Wrapper = ({ isLoading }) => (
        <>
            <Button onClick={toggleState}>
                Show Loader for 5 Seconds
            </Button>
            <Loader isLoading={isLoading}/>
        </>
    );
    <Wrapper isLoading={loading} />
```
