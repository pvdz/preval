# Preval test case

# every_delete_element.md

> Array methods > Every > Ai > Every delete element
>
> Test: Array.every with element deletion during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
const x = arr.every(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr, x);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
delete arr[1];
$(1);
$(arr, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
delete arr[1];
$(1);
$(arr, false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
delete a[ 1 ];
$( 1 );
$( a, false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.every;
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
const x = $dotCall(tmpMCF, arr, `every`, tmpMCP);
$(arr, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [1, , 3], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
