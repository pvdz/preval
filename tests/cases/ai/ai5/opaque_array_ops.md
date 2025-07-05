# Preval test case

# opaque_array_ops.md

> Ai > Ai5 > Opaque array ops
>
> Test preservation of opaque value array operations

## Input

`````js filename=intro
const x = $("test");
const arr = [x, x, x];
const y = arr.map(v => v.toString());
$(y);
    
// Expected:
// const x = $("test");
// const tmp = x.toString();
// const arr = [tmp, tmp, tmp];
// $(arr);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpMCF$1 /*:unknown*/ = x.toString;
const tmpClusterSSA_tmpLambdaMapNow /*:unknown*/ = $dotCall(tmpMCF$1, x, `toString`);
const tmpMCF$2 /*:unknown*/ = x.toString;
const tmpClusterSSA_tmpLambdaMapNow$1 /*:unknown*/ = $dotCall(tmpMCF$2, x, `toString`);
const tmpMCF$3 /*:unknown*/ = x.toString;
const tmpClusterSSA_tmpLambdaMapNow$2 /*:unknown*/ = $dotCall(tmpMCF$3, x, `toString`);
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [
  tmpClusterSSA_tmpLambdaMapNow,
  tmpClusterSSA_tmpLambdaMapNow$1,
  tmpClusterSSA_tmpLambdaMapNow$2,
];
$(tmpLambdaMapOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const tmpClusterSSA_tmpLambdaMapNow = x.toString();
const tmpClusterSSA_tmpLambdaMapNow$1 = x.toString();
const tmpClusterSSA_tmpLambdaMapNow$2 = x.toString();
$([tmpClusterSSA_tmpLambdaMapNow, tmpClusterSSA_tmpLambdaMapNow$1, tmpClusterSSA_tmpLambdaMapNow$2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.toString;
const c = $dotCall( b, a, "toString" );
const d = a.toString;
const e = $dotCall( d, a, "toString" );
const f = a.toString;
const g = $dotCall( f, a, "toString" );
const h = [ c, e, g ];
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const arr = [x, x, x];
const tmpMCF = arr.map;
const tmpMCP = function ($$0) {
  let v = $$0;
  debugger;
  const tmpMCF$1 = v.toString;
  const tmpReturnArg = $dotCall(tmpMCF$1, v, `toString`);
  return tmpReturnArg;
};
const y = $dotCall(tmpMCF, arr, `map`, tmpMCP);
$(y);
`````


## Todos triggered


- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init MemberExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) property on nullable; unreachable or hard error?
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_map
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: ['test', 'test', 'test']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
