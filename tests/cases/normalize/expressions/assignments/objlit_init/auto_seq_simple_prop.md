# Preval test case

# auto_seq_simple_prop.md

> Normalize > Expressions > Assignments > Objlit init > Auto seq simple prop
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { b: $(1) }) });
($(1), a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal$1 };
const tmpCalleeParam /*:object*/ = { x: a };
$(tmpCalleeParam);
$(1);
const tmpAssignMemRhs /*:unknown*/ = $(2);
a.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = $(1);
const a = { b: tmpObjLitVal$1 };
$({ x: a });
$(1);
a.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
const c = { x: b };
$( c );
$( 1 );
const d = $( 2 );
b.b = d;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '{"b":"1"}' }
 - 3: 1
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
