# Preval test case

# pop_arg.md

> Array > Manipulation > Pop > Pop arg
>
> Remove elemenet from array

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const n = ARR.pop($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Pre Normal

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
};
const n = ARR.pop($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Normalized

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const n = ARR.pop($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Output

`````js filename=intro
const ARR = [`a`, `b`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(`c`);
ARR.push(`c`);
$(NOOP);
$(ARR);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: '<function>'
 - 3: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
