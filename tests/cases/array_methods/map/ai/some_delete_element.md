# Preval test case

# some_delete_element.md

> Array methods > Map > Ai > Some delete element
>
> Test: Array.map with element deletion during iteration

## Input

`````js filename=intro
let arr = [1,2,3];
const x = arr.map(function(x, i, a) { if (i === 0) delete a[1]; $(x); });
$(arr, x);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
delete arr[1];
$(1);
const tmpLambdaMapHas$1 /*:boolean*/ = 1 in arr;
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [undefined];
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapVal$2 /*:primitive*/ = arr[1];
  $(tmpLambdaMapVal$2);
  tmpLambdaMapOut[1] = undefined;
} else {
}
const tmpLambdaMapHas$2 /*:boolean*/ = 2 in arr;
if (tmpLambdaMapHas$2) {
  const tmpLambdaMapVal$1 /*:primitive*/ = arr[2];
  $(tmpLambdaMapVal$1);
  tmpLambdaMapOut[2] = undefined;
} else {
}
tmpLambdaMapOut.length = 3;
$(arr, tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
delete arr[1];
$(1);
const tmpLambdaMapHas$1 = 1 in arr;
const tmpLambdaMapOut = [undefined];
if (tmpLambdaMapHas$1) {
  $(arr[1]);
  tmpLambdaMapOut[1] = undefined;
}
if (2 in arr) {
  $(arr[2]);
  tmpLambdaMapOut[2] = undefined;
}
tmpLambdaMapOut.length = 3;
$(arr, tmpLambdaMapOut);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
delete a[ 1 ];
$( 1 );
const b = 1 in a;
const c = [ undefined ];
if (b) {
  const d = a[ 1 ];
  $( d );
  c[1] = undefined;
}
const e = 2 in a;
if (e) {
  const f = a[ 2 ];
  $( f );
  c[2] = undefined;
}
c.length = 3;
$( a, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
const tmpMCF = arr.map;
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
const x = $dotCall(tmpMCF, arr, `map`, tmpMCP);
$(arr, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 
  [1, , 3],
  [undefined, , undefined],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
