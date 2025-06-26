# Preval test case

# every_mutation_push.md

> Array methods > Every > Ai > Every mutation push
>
> Test: Array.every with push during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
let result = [];
const x = arr.every(function(x) { $('pushing another x'); result.push(x); arr.push(x+10); });
$(result, x);
`````


## Settled


`````js filename=intro
$(`pushing another x`);
const result /*:array*/ /*truthy*/ = [1];
$(result, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pushing another x`);
$([1], false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "pushing another x" );
const a = [ 1 ];
$( a, false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
let result = [];
const tmpMCF = arr.every;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(`pushing another x`);
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  const tmpMCF$3 = arr.push;
  const tmpMCP$1 = x$1 + 10;
  $dotCall(tmpMCF$3, arr, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `every`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pushing another x'
 - 2: [1], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
