# Preval test case

# reduce_some_delete_element.md

> Array methods > Reduce > Ai > Reduce some delete element
>
> Test: Array.reduce with element deletion during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
const x = arr.reduce(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr, x);
`````


## Settled


`````js filename=intro
delete (1)[1];
$(1);
delete (2)[1];
$(undefined);
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
$(arr, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
delete (1)[1];
$(1);
delete (2)[1];
$(undefined);
$([1, 2, 3], undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
delete 1[ 1 ];
$( 1 );
delete 2[ 1 ];
$( undefined );
const a = [ 1, 2, 3 ];
$( a, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.reduce;
const tmpMCP = function ($$0, $$1, $$2) {
  let x$1 = $$0;
  let i = $$1;
  let a = $$2;
  debugger;
  const tmpIfTest = i === 0;
  if (tmpIfTest) {
    delete a[1];
    $(x$1);
    return undefined;
  } else {
    $(x$1);
    return undefined;
  }
};
const x = $dotCall(tmpMCF, arr, `reduce`, tmpMCP);
$(arr, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: [1, 2, 3], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
