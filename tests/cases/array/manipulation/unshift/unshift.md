# Preval test case

# unshift.md

> Array > Manipulation > Unshift > Unshift
>
> Array literal with unshift and a const function binding in between
> The push should be replaced with the arg count and the array updated

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.unshift(15);
$(count);
ARR.push(count);
$(NOOP);
`````

## Pre Normal

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
};
const count = ARR.unshift(15);
$(count);
ARR.push(count);
$(NOOP);
`````

## Normalized

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const count = ARR.unshift(15);
$(count);
ARR.push(count);
$(NOOP);
`````

## Output

`````js filename=intro
const ARR = [15, `a`, `b`, `c`, 4];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(4);
$(NOOP);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
