# Preval test case

# auto_prop_simple_complex.md

> Normalize > Expressions > Assignments > Stmt global top > Auto prop simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = { b: $(1) };
a.b = $(2);
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpAssignMemRhs /*:unknown*/ = $(2);
const a /*:object*/ = { b: tmpAssignMemRhs };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAssignMemRhs = $(2);
$({ b: tmpAssignMemRhs });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = { b: a };
$( b );
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
