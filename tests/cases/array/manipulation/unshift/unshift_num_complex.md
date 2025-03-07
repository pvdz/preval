# Preval test case

# unshift_num_complex.md

> Array > Manipulation > Unshift > Unshift num complex
>
> Array literal with unshift and a const function binding in between
> The push should inline the first but not the second because it is complex

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.unshift(10, $);
$(count);
ARR.push(count);
$(NOOP);
`````

## Settled


`````js filename=intro
const ARR /*:array*/ = [`a`, `b`, `c`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
ARR.unshift(10, $);
$(5);
ARR.push(5);
$(NOOP);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  $(ARR);
};
ARR.unshift(10, $);
$(5);
ARR.push(5);
$(NOOP);
`````

## Pre Normal


`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
};
const count = ARR.unshift(10, $);
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
const count = ARR.unshift(10, $);
$(count);
ARR.push(count);
$(NOOP);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
a.unshift( 10, $ );
$( 5 );
a.push( 5 );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 5
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_unshift
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_push