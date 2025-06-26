# Preval test case

# find_delete_element.md

> Array methods > FindIndex > Ai > Find delete element
>
> Test: Array.findIndex with element deletion during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
const x = arr.findIndex(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr, x);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
delete arr[1];
$(1);
const tmpLambdaFindIndexVal$2 /*:primitive*/ = arr[1];
$(tmpLambdaFindIndexVal$2);
const tmpLambdaFindIndexVal$1 /*:primitive*/ = arr[2];
$(tmpLambdaFindIndexVal$1);
$(arr, -1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
delete arr[1];
$(1);
$(arr[1]);
$(arr[2]);
$(arr, -1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
delete a[ 1 ];
$( 1 );
const b = a[ 1 ];
$( b );
const c = a[ 2 ];
$( c );
$( a, -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.findIndex;
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
const x = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(arr, x);
`````


## Todos triggered


- (todo) Support $frfr that has multiple/no/generic returns type;
- (todo) Support this node type in isFree: LabeledStatement
- (todo) do we want to support UnaryExpression as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 3
 - 4: [1, , 3], -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
