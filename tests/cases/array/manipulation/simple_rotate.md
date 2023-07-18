# Preval test case

# simple_rotate.md

> Array > Manipulation > Simple rotate
>
> Array literal with shift and a const function binding in between

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const item = ARR.shift();
ARR.push(item);
$(NOOP);
`````

## Pre Normal

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
};
const item = ARR.shift();
ARR.push(item);
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
const item = ARR.shift();
ARR.push(item);
$(NOOP);
`````

## Output

`````js filename=intro
const ARR = [`b`, `c`, `a`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(NOOP);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "b", "c", "a",, ];
const b = function() {
  debugger;
  $( a );
  return undefined;
},;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
