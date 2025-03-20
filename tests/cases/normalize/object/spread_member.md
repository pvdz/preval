# Preval test case

# spread_member.md

> Normalize > Object > Spread member
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
const obj = { foo: { bar: 10 } };
$({...obj.foo});
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { bar: 10 };
const tmpCalleeParam /*:object*/ = { ...tmpObjLitVal };
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { bar: 10 };
$({ ...tmpObjLitVal });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { bar: 10 };
const b = { ... a };
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { bar: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
