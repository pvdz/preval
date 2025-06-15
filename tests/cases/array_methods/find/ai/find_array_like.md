# Preval test case

# find_array_like.md

> Array methods > Find > Ai > Find array like
>
> Test: Array.find with array-like object

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', 2: 'c', length: 3 });
const result = Array.prototype.find.call(obj, x => x === 'b');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:boolean*/ = x === `b`;
  return tmpReturnArg;
};
const result /*:unknown*/ /*truthy*/ = $dotCall($array_find, obj, undefined, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, [2]: `c`, length: 3 });
$(
  $dotCall($array_find, obj, undefined, function (x) {
    const tmpReturnArg = x === `b`;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  [ 2 ]: "c",
  length: 3,
};
const b = $( a );
const c = function($$0 ) {
  const d = $$0;
  debugger;
  const e = d === "b";
  return e;
};
const f = $dotCall( $array_find, b, undefined, c );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj = $(tmpCalleeParam);
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.find;
const tmpMCF = tmpMCOO.call;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x === `b`;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, tmpMCOO, `call`, obj, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_find


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"', length: '3' }
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
