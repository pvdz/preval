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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const tmpMCF = ARR.pop;
const n = $dotCall(tmpMCF, ARR, `pop`, $);
$(n);
const tmpMCF$1 = ARR.push;
$dotCall(tmpMCF$1, ARR, `push`, n);
$(NOOP);
$(ARR);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) outline any args for tdz
- (todo) support array reads statement type VarStatement


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
