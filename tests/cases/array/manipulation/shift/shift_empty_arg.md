# Preval test case

# shift_empty_arg.md

> Array > Manipulation > Shift > Shift empty arg
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [];
const NOOP = function() {
$(ARR);
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Pre Normal

`````js filename=intro
const ARR = [];
const NOOP = function () {
  debugger;
  $(ARR);
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Normalized

`````js filename=intro
const ARR = [];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Output

`````js filename=intro
const ARR = [];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(undefined);
ARR.push(undefined);
$(NOOP);
$(ARR);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: '<function>'
 - 3: [undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
