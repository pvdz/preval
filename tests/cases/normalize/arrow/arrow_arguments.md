# Preval test case

# arrow_arguments.md

> Normalize > Arrow > Arrow arguments
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

## Pre Normal

`````js filename=intro
let f = function () {
  const g = () => {
    return arguments[0];
  };
  return g();
};
$(f(100));
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const g = function () {
    const tmpReturnArg = tmpPrevalAliasArgumentsAny[0];
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(100);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const g = function () {
    const tmpReturnArg = tmpPrevalAliasArgumentsAny[0];
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpCalleeParam = f(100);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
