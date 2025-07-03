# Preval test case

# foreach_this_primitive.md

> Array methods > Foreach > Ai > Foreach this primitive
>
> Test: Array.forEach with thisArg as primitive (number)

## Input

`````js filename=intro
// Input: [1,2,3].forEach(fn, 42)
// Expected: this is 42 (boxed)
[1,2,3].forEach(function(x) { $(this === 42); }, 42);
`````


## Settled


`````js filename=intro
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
$dotCall(tmpMCP, 42, undefined);
$dotCall(tmpMCP, 42, undefined);
$dotCall(tmpMCP, 42, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
$dotCall(tmpMCP, 42, undefined);
$dotCall(tmpMCP, 42, undefined);
$dotCall(tmpMCP, 42, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
$dotCall( a, 42, undefined );
$dotCall( a, 42, undefined );
$dotCall( a, 42, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.forEach;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP, 42);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
