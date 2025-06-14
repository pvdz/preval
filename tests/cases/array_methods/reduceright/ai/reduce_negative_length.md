# Preval test case

# reduce_negative_length.md

> Array methods > Reduceright > Ai > Reduce negative length
>
> Test: Array.reduceRight with array-like object that has negative length

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', length: -1 });
const result = Array.prototype.reduceRight.call(obj, (acc, val) => acc + val, '');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: -1 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpMCP /*:(unknown, unknown)=>primitive*/ = function ($$0, $$1) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = acc + val;
  return tmpReturnArg;
};
const result /*:array*/ /*truthy*/ = $dotCall($array_reduceRight, obj, undefined, tmpMCP, ``);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, length: -1 });
$(
  $dotCall(
    $array_reduceRight,
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
  length: -1,
};
const b = $( a );
const c = function($$0,$$1 ) {
  const d = $$0;
  const e = $$1;
  debugger;
  const f = d + e;
  return f;
};
const g = $dotCall( $array_reduceRight, b, undefined, c, "" );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, length: -1 };
const obj = $(tmpCalleeParam);
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.reduceRight;
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


- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', length: '-1' }
 - 2: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
