# Preval test case

# find_non_array_object.md

> Array methods > FindIndex > Ai > Find non array object
>
> Test: Array.findIndex on array-like object

## Input

`````js filename=intro
const x = Array.prototype.findIndex.call({0:'a',1:'b',length:2}, function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const tmpLambdaFindIndexVal /*:unknown*/ = tmpMCP[0];
$(tmpLambdaFindIndexVal);
const tmpLambdaFindIndexVal$1 /*:unknown*/ = tmpMCP[1];
$(tmpLambdaFindIndexVal$1);
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
$(tmpMCP[0]);
$(tmpMCP[1]);
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  length: 2,
};
const b = a[ 0 ];
$( b );
const c = a[ 1 ];
$( c );
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.findIndex;
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


- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
