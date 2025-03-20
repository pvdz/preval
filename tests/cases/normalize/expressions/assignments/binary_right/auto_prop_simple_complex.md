# Preval test case

# auto_prop_simple_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto prop simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = { b: $(1) }));
a.b = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
const tmpAssignMemRhs /*:unknown*/ = $(2);
a.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$(tmpBinBothLhs + a);
a.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 1 );
const c = { b: b };
const d = a + c;
$( d );
const e = $( 2 );
c.b = e;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: '100[object Object]'
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
