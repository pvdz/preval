# Preval test case

# some_delete_element.md

> Array methods > Filter > Ai > Some delete element
>
> Test: Array.filter with element deletion during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
const x = arr.filter(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr, x);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
delete arr[1];
$(1);
const tmpLambdaFilterHas$1 /*:boolean*/ = 1 in arr;
if (tmpLambdaFilterHas$1) {
  const tmpLambdaFilterVal$2 /*:primitive*/ = arr[1];
  $(tmpLambdaFilterVal$2);
} else {
}
const tmpLambdaFilterHas$2 /*:boolean*/ = 2 in arr;
if (tmpLambdaFilterHas$2) {
  const tmpLambdaFilterVal$1 /*:primitive*/ = arr[2];
  $(tmpLambdaFilterVal$1);
} else {
}
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
$(arr, tmpLambdaFilterOut);
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
}
$(arr, []);
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
}
const f = [];
$( a, f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.filter;
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
const x = $dotCall(tmpMCF, arr, `filter`, tmpMCP);
$(arr, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, , 3], []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
