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


## Settled


`````js filename=intro
const ARR /*:array*/ /*truthy*/ = [`a`, `b`, `c`, 10, $, 20];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(6);
$dotCall($array_push, ARR, `push`, 6);
$(NOOP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`a`, `b`, `c`, 10, $, 20];
const NOOP = function () {
  $(ARR);
};
$(6);
$dotCall($array_push, ARR, `push`, 6);
$(NOOP);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", 10, $, 20 ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( 6 );
$dotCall( $array_push, a, "push", 6 );
$( b );
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
const tmpMCF = ARR.push;
const count = $dotCall(tmpMCF, ARR, `push`, 10, $, 20);
$(count);
const tmpMCF$1 = ARR.push;
$dotCall(tmpMCF$1, ARR, `push`, count);
$(NOOP);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
