# Preval test case

# push_complex.md

> Array > Manipulation > Push > Push complex
>
> Array literal with push and a const function binding in between
> The push should not push complex values (like implicit globals)

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.push($);
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
const count = ARR.push($);
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
const count = ARR.push($);
$(count);
ARR.push(count);
$(NOOP);
`````

## Output


`````js filename=intro
const ARR /*:array*/ = [`a`, `b`, `c`];
const NOOP /*:()=>*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
ARR.push($);
$(4);
ARR.push(4);
$(NOOP);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
a.push( $ );
$( 4 );
a.push( 4 );
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
