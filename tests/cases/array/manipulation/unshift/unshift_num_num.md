# Preval test case

# unshift_num_num.md

> Array > Manipulation > Unshift > Unshift num num
>
> Array literal with unshift and a const function binding in between
> The push should inline the args and eliminate the call

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.unshift(10, 20);
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
const count = ARR.unshift(10, 20);
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
const count = ARR.unshift(10, 20);
$(count);
ARR.push(count);
$(NOOP);
`````

## Output


`````js filename=intro
const ARR /*:array*/ = [10, 20, `a`, `b`, `c`, 5];
const NOOP /*:()=>*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(5);
$(NOOP);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20, "a", "b", "c", 5 ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( 5 );
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
