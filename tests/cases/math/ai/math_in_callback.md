# Preval test case

# math_in_callback.md

> Math > Ai > Math in callback
>
> Math in callback function

## Input

`````js filename=intro
const arr = [1, 2, 3];
const squares = arr.map(x => Math.pow(x, 2));
$(squares[0]);
$(squares[1]);
$(squares[2]);
// Should be 1, 4, 9
`````


## Settled


`````js filename=intro
$(1);
$(4);
$(9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(4);
$(9);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 4 );
$( 9 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCF = arr.map;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpMCF$1 = $Math_pow;
  const tmpReturnArg = $Math_pow(x, 2);
  return tmpReturnArg;
};
const squares = $dotCall(tmpMCF, arr, `map`, tmpMCP);
let tmpCalleeParam = squares[0];
$(tmpCalleeParam);
let tmpCalleeParam$1 = squares[1];
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = squares[2];
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) In some (many?) cases the array can access this value so we could move the rhs into the array...
- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $Math_pow
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 4
 - 3: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
