# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { b: $(1) })];
a["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const obj /*:object*/ = {};
const a /*:object*/ = { b: tmpObjLitVal };
obj[a];
const tmpAssignMemRhs /*:unknown*/ = $(2);
a.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const obj = {};
const a = { b: tmpObjLitVal };
obj[a];
a.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {};
const c = { b: a };
b[ c ];
const d = $( 2 );
c.b = d;
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
