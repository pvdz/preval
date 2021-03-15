# Preval test case

# arrow_arguments.length.md

> Normalize > Arrow > Arrow arguments.length
>
> Basic case of this wrapping


```js
function f() {
  const args = arguments;
  const g = function(){
    return args.length;
  }

  return g(5, 6);
}
$(f(1, 2, 3, 4));
```

#TODO

## Input

`````js filename=intro
function f() {
  const g = () => arguments.length;
  
  return g(5, 6);
}
$(f(1, 2, 3, 4));
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const g = () => {
    return arguments.length;
  };
  return g(5, 6);
};
$(f(1, 2, 3, 4));
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const g = function () {
    return tmpPrevalAliasArgumentsLen;
  };
  const tmpReturnArg = g(5, 6);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3, 4);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  return tmpPrevalAliasArgumentsLen;
};
const tmpCalleeParam = f(1, 2, 3, 4);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
