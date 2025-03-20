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


## Settled


`````js filename=intro
const ARR /*:array*/ = [`a`, `b`, `c`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
ARR.push($, 10);
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
ARR.push($, 10);
$(5);
ARR.push(5);
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
a.push( $, 10 );
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
