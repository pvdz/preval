# Preval test case

# shift_arg.md

> Array > Manipulation > Shift > Shift arg
>
> Remove elemenet from array

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ = [`b`, `c`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(`a`);
$dotCall($array_push, ARR, `push`, `a`);
$(NOOP);
$(ARR);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`b`, `c`];
const NOOP = function () {
  $(ARR);
};
$(`a`);
$dotCall($array_push, ARR, `push`, `a`);
$(NOOP);
$(ARR);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "b", "c" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( "a" );
$dotCall( $array_push, a, "push", "a" );
$( b );
$( a );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) outline any args for tdz
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: '<function>'
 - 3: ['b', 'c', 'a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
