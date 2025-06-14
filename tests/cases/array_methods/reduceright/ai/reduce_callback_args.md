# Preval test case

# reduce_callback_args.md

> Array methods > Reduceright > Ai > Reduce callback args
>
> Test: Array.reduceRight callback arguments (accumulator, value, index, array)

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
const result = arr.reduceRight((acc, val, idx, array) => {
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
const tmpMCF /*:unknown*/ = arr.reduceRight;
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
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP, 0);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
const tmpMCF = arr.reduceRight;
$(
  $dotCall(
    tmpMCF,
    arr,
    `reduceRight`,
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
const c = b.reduceRight;
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
const j = $dotCall( c, b, "reduceRight", d, 0 );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduceRight;
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
const result = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP, 0);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 0
 - 3: 3
 - 4: 2
 - 5: [1, 2, 3]
 - 6: 3
 - 7: 2
 - 8: 1
 - 9: [1, 2, 3]
 - 10: 5
 - 11: 1
 - 12: 0
 - 13: [1, 2, 3]
 - 14: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
