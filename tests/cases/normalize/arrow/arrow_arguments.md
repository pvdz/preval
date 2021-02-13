# Preval test case

# arrow_this.md

> normalize > arrow > arrow_this
>
> Basic case of this wrapping


```js
function f() {
  const args = arguments;
  const g = function(){
    return args[0];
  }

  return g();
}
$(f(1));
```

#TODO

## Input

`````js filename=intro
function f() {
  const g = () => arguments[0];
  
  return g();
}
$(f(100));
`````

## Normalized

`````js filename=intro
function f() {
  const g = () => {
    const tmpReturnArg = arguments[0];
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
}
const tmpCallCallee = $;
const tmpCalleeParam = f(100);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const g = () => {
    const tmpReturnArg = arguments[0];
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
}
const tmpCalleeParam = f(100);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same