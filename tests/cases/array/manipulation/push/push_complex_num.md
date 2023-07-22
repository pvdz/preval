# Preval test case

# push_complex_num.md

> Array > Manipulation > Push > Push complex num
>
> Array literal with push and a const function binding in between
> The push should not inline anything because the first element is complex and blocks the rest

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.push($, 10);
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
const count = ARR.push($, 10);
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
const count = ARR.push($, 10);
$(count);
ARR.push(count);
$(NOOP);
`````

## Output

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
ARR.push($, 10);
$(5);
ARR.push(5);
$(NOOP);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c",, ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
a.push( $, 10 );
$( 5 );
a.push( 5 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
