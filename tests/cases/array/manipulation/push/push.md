# Preval test case

# push.md

> Array > Manipulation > Push > Push
>
> Array literal with push and a const function binding in between
> The push should be replaced with the arg count and the array updated

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.push(15);
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
const count = ARR.push(15);
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
const count = ARR.push(15);
$(count);
ARR.push(count);
$(NOOP);
`````

## Output

`````js filename=intro
const ARR = [`a`, `b`, `c`, 15, 4];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(4);
$(NOOP);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c", 15, 4 ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( 4 );
$( b );
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
