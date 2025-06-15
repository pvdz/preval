# Preval test case

# some_delete_element.md

> Array methods > Some > Ai > Some delete element
>
> Test: Array.some with element deletion during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
const x = arr.some(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr, x);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
delete arr[1];
$(1);
const tmpLambdaSomeHas$1 /*:boolean*/ = 1 in arr;
if (tmpLambdaSomeHas$1) {
  const tmpLambdaSomeVal$2 /*:primitive*/ = arr[1];
  $(tmpLambdaSomeVal$2);
} else {
}
const tmpLambdaSomeHas$2 /*:boolean*/ = 2 in arr;
if (tmpLambdaSomeHas$2) {
  const tmpLambdaSomeVal$1 /*:primitive*/ = arr[2];
  $(tmpLambdaSomeVal$1);
  $(arr, false);
} else {
  $(arr, false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
delete arr[1];
$(1);
if (1 in arr) {
  $(arr[1]);
}
if (2 in arr) {
  $(arr[2]);
  $(arr, false);
} else {
  $(arr, false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
delete a[ 1 ];
$( 1 );
const b = 1 in a;
if (b) {
  const c = a[ 1 ];
  $( c );
}
const d = 2 in a;
if (d) {
  const e = a[ 2 ];
  $( e );
  $( a, false );
}
else {
  $( a, false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.some;
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
const x = $dotCall(tmpMCF, arr, `some`, tmpMCP);
$(arr, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, , 3], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
