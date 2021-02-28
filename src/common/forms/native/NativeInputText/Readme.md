### NativeInputText

```jsx
const [text, setText] = React.useState("Native");
handleChange = (event) => setText(event.target.value);
<NativeInputText input={{ value: text, onChange: handleChange }} label="TexBox" hint="Try this" hintLink="Help " />;
```

### Disabled NativeInputText

```jsx
const [text, setText] = React.useState("Native");
handleChange = (event) => setText(event.target.value);
<NativeInputText
    input={{ value: text, onChange: handleChange }}
    label="TexBox"
    hint="Try this"
    hintLink="Help "
    disabled
    // error,
/>;
```

### NativeInputText on error

```jsx
const [text, setText] = React.useState("Native");
handleChange = (event) => setText(event.target.value);
<NativeInputText
    input={{ value: text, onChange: handleChange }}
    label="TexBox"
    hint="Try this"
    hintLink="Help link"
    error={<div> Oops! this is an error </div>}
/>;
```
