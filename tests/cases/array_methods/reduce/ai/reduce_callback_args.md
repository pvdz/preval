# Preval test case

# reduce_callback_args.md

> Array methods > Reduce > Ai > Reduce callback args
>
> Test: Array.reduce callback arguments (accumulator, value, index, array)

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
const result = arr.reduce((acc, val, idx, array) => {
    $(acc);  // Should be 0, 1, 3
    $(val);  // Should be 1, 2, 3
    $(idx);  // Should be 0, 1, 2
    $(array);  // Should be [1, 2, 3]
    return acc + val;
}, 0);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduce;
const tmpMCP /*:(unknown, unknown, unknown, unknown)=>primitive*/ = function ($$0, $$1, $$2, $$3) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  const idx /*:unknown*/ = $$2;
  const array /*:unknown*/ = $$3;
  debugger;
  $(acc);
  $(val);
  $(idx);
  $(array);
  const tmpReturnArg /*:primitive*/ = acc + val;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduce`, tmpMCP, 0);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
const tmpMCF = arr.reduce;
$(
  $dotCall(
    tmpMCF,
    arr,
    `reduce`,
    function (acc, val, idx, array) {
      $(acc);
      $(val);
      $(idx);
      $(array);
      const tmpReturnArg = acc + val;
      return tmpReturnArg;
    },
    0,
  ),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = b.reduce;
const d = function($$0,$$1,$$2,$$3 ) {
  const e = $$0;
  const f = $$1;
  const g = $$2;
  const h = $$3;
  debugger;
  $( e );
  $( f );
  $( g );
  $( h );
  const i = e + f;
  return i;
};
const j = $dotCall( c, b, "reduce", d, 0 );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduce;
const tmpMCP = function ($$0, $$1, $$2, $$3) {
  let acc = $$0;
  let val = $$1;
  let idx = $$2;
  let array = $$3;
  debugger;
  $(acc);
  $(val);
  $(idx);
  $(array);
  const tmpReturnArg = acc + val;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `reduce`, tmpMCP, 0);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 0
 - 3: 1
 - 4: 0
 - 5: [1, 2, 3]
 - 6: 1
 - 7: 2
 - 8: 1
 - 9: [1, 2, 3]
 - 10: 3
 - 11: 3
 - 12: 2
 - 13: [1, 2, 3]
 - 14: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
