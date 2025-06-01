# Preval test case

# opaque_obj_spread.md

> Ai > Ai5 > Opaque obj spread
>
> Test preservation of opaque value object spread operations

## Input

`````js filename=intro
const x = $("test");
const obj = { ...x, ...x };
$(obj);

// Expected:
// const x = $("test");
// const tmp = { ...x };
// const obj = { ...tmp, ...tmp };
// $(obj);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const obj /*:object*/ = { ...x, ...x };
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
$({ ...x, ...x });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = {
  ... a,
  ... a,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const obj = { ...x, ...x };
$(obj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: { 0: '"t"', 1: '"e"', 2: '"s"', 3: '"t"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
