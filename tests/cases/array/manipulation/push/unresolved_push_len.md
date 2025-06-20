# Preval test case

# unresolved_push_len.md

> Array > Manipulation > Push > Unresolved push len
>
> Array literal with push and a const function binding in between
> The push should be replaced with the arg count and the array updated

## Options

- globals: x

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
  $(ARR);
};
$('block heuristics');     // At some point preval will just work around this... ;)
const count = ARR.push(x); // We can't resolve this but we can resolve the .len
$(count);
`````


## Settled


`````js filename=intro
$(`block heuristics`);
x;
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`block heuristics`);
x;
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "block heuristics" );
x;
$( 4 );
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
$(`block heuristics`);
const tmpMCF = ARR.push;
const count = $dotCall(tmpMCF, ARR, `push`, x);
$(count);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 'block heuristics'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
