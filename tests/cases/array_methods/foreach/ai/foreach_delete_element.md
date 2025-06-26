# Preval test case

# foreach_delete_element.md

> Array methods > Foreach > Ai > Foreach delete element
>
> Test: Array.forEach with element deletion during iteration

## Input

`````js filename=intro
// Input: let arr = [1,2,3]; arr.forEach(fn) where fn deletes arr[1]
// Expected: fn is called for all original elements
let arr = [1,2,3];
arr.forEach(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
delete arr[1];
$(1);
const tmpLambdaForeachCounterHas$1 /*:boolean*/ = 1 in arr;
if (tmpLambdaForeachCounterHas$1) {
  const tmpLambdaForeachCounterVal$2 /*:primitive*/ = arr[1];
  $(tmpLambdaForeachCounterVal$2);
} else {
}
const tmpLambdaForeachCounterHas$2 /*:boolean*/ = 2 in arr;
if (tmpLambdaForeachCounterHas$2) {
  const tmpLambdaForeachCounterVal$1 /*:primitive*/ = arr[2];
  $(tmpLambdaForeachCounterVal$1);
  $(arr);
} else {
  $(arr);
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
  $(arr);
} else {
  $(arr);
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
  $( a );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.forEach;
const tmpMCP = function ($$0, $$1, $$2) {
  let x = $$0;
  let i = $$1;
  let a = $$2;
  debugger;
  const tmpIfTest = i === 0;
  if (tmpIfTest) {
    delete a[1];
    $(x);
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
$dotCall(tmpMCF, arr, `forEach`, tmpMCP);
$(arr);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, , 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
