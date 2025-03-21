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


## Settled


`````js filename=intro
const ARR /*:array*/ = [10, 20, `a`, `b`, `c`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(5);
ARR.push(5);
$(NOOP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [10, 20, `a`, `b`, `c`];
const NOOP = function () {
  $(ARR);
};
$(5);
ARR.push(5);
$(NOOP);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20, "a", "b", "c" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( 5 );
a.push( 5 );
$( b );
`````


## Todos triggered


None


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
