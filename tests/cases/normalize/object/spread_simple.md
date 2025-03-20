# Preval test case

# spread_simple.md

> Normalize > Object > Spread simple
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
const obj = { foo: { bar: 10 } };
$({...obj});
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { bar: 10 };
const obj /*:object*/ = { foo: tmpObjLitVal };
const tmpCalleeParam /*:object*/ = { ...obj };
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
const obj = { foo: tmpObjLitVal };
$({ ...obj });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { foo: a };
const c = { ... b };
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { foo: '{"bar":"10"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
