### LoaderInline
```jsx
    
    const Button = require('../../buttons/Button').default;
    import FormPanel from '../../forms/FormPanel';

    const Wrapper = () => {
        const [loading, setLoading] = React.useState(false)
        const toggleState = () => {
            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
            }, 5000)
        }
        return(
            <>
                <Button onClick={toggleState}>
                    Show Inline Loader for 5 Seconds
                </Button>
                <FormPanel>
                { loading && <LoaderInline message='custom loading...'/> }
                </FormPanel>
            </>
        );
    }
    <Wrapper />
```

