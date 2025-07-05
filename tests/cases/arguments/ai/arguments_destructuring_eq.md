# Preval test case

# arguments_destructuring_eq.md

> Arguments > Ai > Arguments destructuring eq
>
> Test destructuring arguments object

## Input

`````js filename=intro
function testArgsDestructuring(a,b,c,d,e) {
  const [first, second, ...rest] = arguments;
  $(first, second, rest);
}
testArgsDestructuring('a', 'b', 'c', 'd', 'e');
`````


## Settled


`````js filename=intro
const rest /*:array*/ /*truthy*/ = [`c`, `d`, `e`];
$(`a`, `b`, rest);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`, `b`, [`c`, `d`, `e`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "c", "d", "e" ];
$( "a", "b", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsDestructuring = function ($$0, $$1, $$2, $$3, $$4) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  const tmpBindingPatternArrRoot = tmpPrevalAliasArgumentsAny;
  const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  const first = tmpArrPatternSplat[0];
  const second = tmpArrPatternSplat[1];
  const tmpMCF = tmpArrPatternSplat.slice;
  const rest = $dotCall(tmpMCF, tmpArrPatternSplat, `slice`, 2);
  $(first, second, rest);
  return undefined;
};
testArgsDestructuring(`a`, `b`, `c`, `d`, `e`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) array reads var statement with init ArrayExpression
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a', 'b', ['c', 'd', 'e']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
