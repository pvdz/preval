# Preval test case

# push_num_complex_num.md

> Array > Manipulation > Push > Push num complex num
>
> Array literal with push and a const function binding in between
> The push should inline the first but not the second because it is complex

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.push(10, $, 20);
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
const count = ARR.push(10, $, 20);
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
const count = ARR.push(10, $, 20);
$(count);
ARR.push(count);
$(NOOP);
`````

## Output


`````js filename=intro
const ARR /*:array*/ = [`a`, `b`, `c`, 10];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
ARR.push($, 20);
$(6);
ARR.push(6);
$(NOOP);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c", 10 ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
a.push( $, 20 );
$( 6 );
a.push( 6 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 6
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
