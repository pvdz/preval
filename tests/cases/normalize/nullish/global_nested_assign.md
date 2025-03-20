# Preval test case

# global_nested_assign.md

> Normalize > Nullish > Global nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj??a??b);
`````


## Settled


`````js filename=intro
$();
const tmpObjLitVal /*:object*/ = { b: 15 };
const obj /*:object*/ = { a: tmpObjLitVal };
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
const tmpObjLitVal = { b: 15 };
$({ a: tmpObjLitVal });
`````


## PST Settled
With rename=true

`````js filename=intro
$();
const a = { b: 15 };
const b = { a: a };
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"15"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
