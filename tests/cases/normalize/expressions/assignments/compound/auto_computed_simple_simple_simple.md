# Preval test case

# auto_computed_simple_simple_simple.md

> Normalize > Expressions > Assignments > Compound > Auto computed simple simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= { b: $(1) }));
a["b"] = 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
const tmpBinBothRhs /*:object*/ = { b: tmpObjLitVal };
const tmpClusterSSA_a /*:number*/ = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
tmpClusterSSA_a.b = 2;
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpClusterSSA_a = { a: 999, b: 1000 } * { b: tmpObjLitVal };
$(tmpClusterSSA_a);
tmpClusterSSA_a.b = 2;
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
const c = { b: a };
const d = b * c;
$( d );
d.b = 2;
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: NaN
 - eval returned: ("<crash[ Cannot create property 'b' on number 'NaN' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
