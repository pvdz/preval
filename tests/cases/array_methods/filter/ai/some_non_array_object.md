# Preval test case

# some_non_array_object.md

> Array methods > Filter > Ai > Some non array object
>
> Test: Array.filter on array-like object

## Input

`````js filename=intro
const x = Array.prototype.filter.call({0:'a',1:'b',length:2}, function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const tmpLambdaFilterHas /*:boolean*/ = 0 in tmpMCP;
if (tmpLambdaFilterHas) {
  const tmpLambdaFilterVal /*:unknown*/ = tmpMCP[0];
  $(tmpLambdaFilterVal);
} else {
}
const tmpLambdaFilterHas$1 /*:boolean*/ = 1 in tmpMCP;
if (tmpLambdaFilterHas$1) {
  const tmpLambdaFilterVal$1 /*:unknown*/ = tmpMCP[1];
  $(tmpLambdaFilterVal$1);
} else {
}
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
$(tmpLambdaFilterOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
if (0 in tmpMCP) {
  $(tmpMCP[0]);
}
if (1 in tmpMCP) {
  $(tmpMCP[1]);
}
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  length: 2,
};
const b = 0 in a;
if (b) {
  const c = a[ 0 ];
  $( c );
}
const d = 1 in a;
if (d) {
  const e = a[ 1 ];
  $( e );
}
const f = [];
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.filter;
const tmpMCF = tmpMCOO.call;
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
const tmpMCP$1 = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, tmpMCP$1);
$(x);
`````


## Todos triggered


- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
