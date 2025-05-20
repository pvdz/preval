# Preval test case

# global_nested.md

> Normalize > Nullish > Global nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj??a??b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $();
const tmpObjLitVal /*:object*/ = { b: tmpObjLitVal$1 };
const tmpCalleeParam /*:object*/ = { a: tmpObjLitVal };
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
$({ a: tmpObjLitVal });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = { b: a };
const c = { a: b };
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"undefined"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
