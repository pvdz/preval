# Preval test case

# return.md

> Normalize > Ternary > Return
>
> Example of rewriting a return statement with ternary

#TODO

## Input

`````js filename=intro
function f() {
  let a = 1, b = 2, c = 3;
  return a ? b : c;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = 1,
    b = 2,
    c = 3;
  return a ? b : c;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = 1;
  let b = 2;
  let c = 3;
  let tmpReturnArg = undefined;
  if (a) {
    tmpReturnArg = b;
    return tmpReturnArg;
  } else {
    tmpReturnArg = c;
    return tmpReturnArg;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
