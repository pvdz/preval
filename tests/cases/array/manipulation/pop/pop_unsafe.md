# Preval test case

# pop_unsafe.md

> Array > Manipulation > Pop > Pop unsafe
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
  $(ARR);
};
const n = ARR.pop();
$(n);
$(NOOP);
ARR.push(n); // this cant be inlined now because if NOOP gets called we don't know what happens to ARR
$(ARR);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ /*truthy*/ = [`a`, `b`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(`c`);
$(NOOP);
$dotCall($array_push, ARR, `push`, `c`);
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
$(NOOP);
$dotCall($array_push, ARR, `push`, `c`);
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
$( b );
$dotCall( $array_push, a, "push", "c" );
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
const n = $dotCall(tmpMCF, ARR, `pop`);
$(n);
$(NOOP);
const tmpMCF$1 = ARR.push;
$dotCall(tmpMCF$1, ARR, `push`, n);
$(ARR);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init CallExpression
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_pop


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
