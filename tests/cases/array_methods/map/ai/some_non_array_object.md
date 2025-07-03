# Preval test case

# some_non_array_object.md

> Array methods > Map > Ai > Some non array object
>
> Test: Array.map on array-like object

## Input

`````js filename=intro
const x = Array.prototype.map.call({0:'a',1:'b',length:2}, function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const tmpLambdaMapHas /*:boolean*/ = 0 in tmpMCP;
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [];
if (tmpLambdaMapHas) {
  const tmpLambdaMapVal /*:unknown*/ = tmpMCP[0];
  $(tmpLambdaMapVal);
  tmpLambdaMapOut[0] = undefined;
} else {
}
const tmpLambdaMapHas$1 /*:boolean*/ = 1 in tmpMCP;
if (tmpLambdaMapHas$1) {
  const tmpLambdaMapVal$1 /*:unknown*/ = tmpMCP[1];
  $(tmpLambdaMapVal$1);
  tmpLambdaMapOut[1] = undefined;
} else {
}
tmpLambdaMapOut.length = 2;
$(tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
const tmpLambdaMapHas = 0 in tmpMCP;
const tmpLambdaMapOut = [];
if (tmpLambdaMapHas) {
  $(tmpMCP[0]);
  tmpLambdaMapOut[0] = undefined;
}
if (1 in tmpMCP) {
  $(tmpMCP[1]);
  tmpLambdaMapOut[1] = undefined;
}
tmpLambdaMapOut.length = 2;
$(tmpLambdaMapOut);
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
const c = [];
if (b) {
  const d = a[ 0 ];
  $( d );
  c[0] = undefined;
}
const e = 1 in a;
if (e) {
  const f = a[ 1 ];
  $( f );
  c[1] = undefined;
}
c.length = 2;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.map;
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


- (todo) array reads var statement with init MemberExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: [undefined, undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
