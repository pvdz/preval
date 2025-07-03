# Preval test case

# find_delete_element.md

> Array methods > Findlastindex > Ai > Find delete element
>
> Test: Array.findLastIndex with element deletion during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
const x = arr.findLastIndex(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr, x);
`````


## Settled


`````js filename=intro
$(3);
$(2);
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
delete arr[1];
$(1);
$(arr, -1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(2);
const arr = [1, 2, 3];
delete arr[1];
$(1);
$(arr, -1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 2 );
const a = [ 1, 2, 3 ];
delete a[ 1 ];
$( 1 );
$( a, -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.findLastIndex;
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
const x = $dotCall(tmpMCF, arr, `findLastIndex`, tmpMCP);
$(arr, x);
`````


## Todos triggered


- (todo) Support $frfr that has multiple/no/generic returns type;
- (todo) Support this node type in isFree: LabeledStatement
- (todo) array reads var statement with init CallExpression
- (todo) do we want to support UnaryExpression as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_findLastIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 2
 - 3: 1
 - 4: [1, , 3], -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
