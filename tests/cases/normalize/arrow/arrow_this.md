# Preval test case

# arrow_this.md

> normalize > arrow > arrow_this
>
> Basic case of this wrapping


```js
function f() {
  const that = this;
  const g = function(){
    return that.x;
  }

  return g();
}
$(f.call({x: 100}));
```

#TODO

## Input

`````js filename=intro
function f() {
  const g = () => this.x;
  
  return g();
}
$(f.call({x: 100}));
`````

## Normalized

`````js filename=intro
function f() {
  const g = () => {
    const tmpCompObj = this;
    const tmpReturnArg = tmpCompObj.x;
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
}
const tmpCallCallee = $;
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam$1 = { x: 100 };
const tmpCalleeParam = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const g = () => {
    const tmpCompObj = this;
    const tmpReturnArg = tmpCompObj.x;
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
}
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam$1 = { x: 100 };
const tmpCalleeParam = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
