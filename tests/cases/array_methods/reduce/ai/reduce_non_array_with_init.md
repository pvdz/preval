# Preval test case

# reduce_non_array_with_init.md

> Array methods > Reduce > Ai > Reduce non array with init
>
> Test: Array.reduce with non-array object and initial value

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', length: 2 });
const result = Array.prototype.reduce.call(obj, (acc, val) => acc + val, '');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpMCP /*:(unknown, unknown)=>primitive*/ = function ($$0, $$1) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = acc + val;
  return tmpReturnArg;
};
const result /*:array*/ /*truthy*/ = $dotCall($array_reduce, obj, undefined, tmpMCP, ``);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, length: 2 });
$(
  $dotCall(
    $array_reduce,
    obj,
    undefined,
    function (acc, val) {
      const tmpReturnArg = acc + val;
      return tmpReturnArg;
    },
    ``,
  ),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  length: 2,
};
const b = $( a );
const c = function($$0,$$1 ) {
  const d = $$0;
  const e = $$1;
  debugger;
  const f = d + e;
  return f;
};
const g = $dotCall( $array_reduce, b, undefined, c, "" );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, length: 2 };
const obj = $(tmpCalleeParam);
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.reduce;
const tmpMCF = tmpMCOO.call;
const tmpMCP = function ($$0, $$1) {
  let acc = $$0;
  let val = $$1;
  debugger;
  const tmpReturnArg = acc + val;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, tmpMCOO, `call`, obj, tmpMCP, ``);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', length: '2' }
 - 2: 'ab'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
