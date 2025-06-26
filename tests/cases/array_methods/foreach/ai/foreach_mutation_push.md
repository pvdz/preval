# Preval test case

# foreach_mutation_push.md

> Array methods > Foreach > Ai > Foreach mutation push
>
> Test: Array.forEach with push during iteration

## Input

`````js filename=intro
// Input: let arr = [1,2,3]; arr.forEach(fn) where fn pushes to arr
// Expected: Only original elements are visited
let arr = [1,2,3];
let result = [];
arr.forEach(function(x) { $('pushing another x'); result.push(x); arr.push(x+10); });
$(result);
`````


## Settled


`````js filename=intro
$(`pushing another x`);
$(`pushing another x`);
$(`pushing another x`);
const result /*:array*/ /*truthy*/ = [1, 2, 3];
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pushing another x`);
$(`pushing another x`);
$(`pushing another x`);
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pushing another x" );
$( "pushing another x" );
$( "pushing another x" );
const a = [ 1, 2, 3 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
let result = [];
const tmpMCF = arr.forEach;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  $(`pushing another x`);
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x);
  const tmpMCF$3 = arr.push;
  const tmpMCP$1 = x + 10;
  $dotCall(tmpMCF$3, arr, `push`, tmpMCP$1);
  return undefined;
};
$dotCall(tmpMCF, arr, `forEach`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pushing another x'
 - 2: 'pushing another x'
 - 3: 'pushing another x'
 - 4: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
