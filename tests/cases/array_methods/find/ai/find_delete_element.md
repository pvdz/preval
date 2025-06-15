# Preval test case

# find_delete_element.md

> Array methods > Find > Ai > Find delete element
>
> Test: Array.find with element deletion during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
const x = arr.find(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr, x);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
delete arr[1];
$(1);
const tmpArrel$2 /*:primitive*/ = arr[1];
$(tmpArrel$2);
const tmpArrel$1 /*:primitive*/ = arr[2];
$(tmpArrel$1);
$(arr, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
delete arr[1];
$(1);
$(arr[1]);
$(arr[2]);
$(arr, undefined);
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
$( a, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.find;
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
const x = $dotCall(tmpMCF, arr, `find`, tmpMCP);
$(arr, x);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement
- (todo) do we want to support UnaryExpression as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_find


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 3
 - 4: [1, , 3], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
