# Preval test case

# obj_literal_normalize.md

> Ai > Ai5 > Obj literal normalize
>
> Test normalization of object literals to Object.create

## Input

`````js filename=intro
const obj = { a: 1, b: 2 };
$(obj);

// Expected:
// const obj = Object.create(Object.prototype, {
//     a: { value: 1, enumerable: true },
//     b: { value: 2, enumerable: true }
// });
// $(obj);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { a: 1, b: 2 };
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 1, b: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { a: 1, b: 2 };
$(obj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
