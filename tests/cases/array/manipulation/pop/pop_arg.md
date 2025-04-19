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


## Settled


`````js filename=intro
const ARR /*:array*/ = [`a`, `b`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(`c`);
$dotCall($array_push, ARR, `push`, `c`);
$(NOOP);
$(ARR);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`a`, `b`];
const NOOP = function () {
  $(ARR);
};
$(`c`);
$dotCall($array_push, ARR, `push`, `c`);
$(NOOP);
$(ARR);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( "c" );
$dotCall( $array_push, a, "push", "c" );
$( b );
$( a );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpCallCompVal
- (todo) outline any args for tdz
- (todo) access object property that also exists on prototype? $array_push


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: '<function>'
 - 3: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
