# Preval test case

# reduceright_mutate_length_up.md

> Array methods > Reduceright > Ai > Reduceright mutate length up
>
> Test: Array.reduceRight with length increase during iteration

## Input

`````js filename=intro
let arr = [1,2];
let result = [];
const x = arr.reduceRight(function(x, i, a) { result.push(x); if (i === 1) a.length = 4; });
$(result, x);
`````


## Settled


`````js filename=intro
(0).length = 4;
const result /*:array*/ /*truthy*/ = [2];
$(result, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(0).length = 4;
$([2], undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
0.length = 4;
const a = [ 2 ];
$( a, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2];
let result = [];
const tmpMCF = arr.reduceRight;
const tmpMCP = function ($$0, $$1, $$2) {
  let x$1 = $$0;
  let i = $$1;
  let a = $$2;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  const tmpIfTest = i === 1;
  if (tmpIfTest) {
    a.length = 4;
    return undefined;
  } else {
    return undefined;
  }
};
const x = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot create property 'length' on number '0' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
