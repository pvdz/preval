# Preval test case

# base.md

> Normalize > Arguments > Len > Base
>
> Base case for the special `arguments.length` case

#TODO

## Input

`````js filename=intro
function f() {
  $(arguments.length);
}
f(1, 2, 3);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpArgumentsLen = arguments.length;
  debugger;
  $(tmpArgumentsLen);
};
f(1, 2, 3);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpArgumentsLen = arguments.length;
  debugger;
  $(tmpArgumentsLen);
};
f(1, 2, 3);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpArgumentsLen = arguments.length;
  debugger;
  $(tmpArgumentsLen);
};
f(1, 2, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
