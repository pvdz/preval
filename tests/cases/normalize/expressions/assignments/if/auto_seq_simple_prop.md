# Preval test case

# auto_seq_simple_prop.md

> Normalize > Expressions > Assignments > If > Auto seq simple prop
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = { b: $(1) }));
($(1), a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(1);
const tmpAssignMemRhs /*:unknown*/ = $(2);
const a /*:object*/ /*truthy*/ = { b: tmpAssignMemRhs };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
const tmpAssignMemRhs = $(2);
$({ b: tmpAssignMemRhs });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
const a = $( 2 );
const b = { b: a };
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
const tmpIfTest = a;
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
