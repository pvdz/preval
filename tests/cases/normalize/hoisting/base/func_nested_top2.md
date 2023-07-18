# Preval test case

# func_nested_top2.md

> Normalize > Hoisting > Base > Func nested top2
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
g();
function g() {
  f();
  function f() {
    return 100;
  }
}
`````

## Pre Normal

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return 100;
  };
  f();
};
g();
`````

## Normalized

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return 100;
  };
  f();
  return undefined;
};
g();
`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
