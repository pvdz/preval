# Preval test case

# auto_seq_simple_prop.md

> Normalize > Expressions > Assignments > Call spread > Auto seq simple prop
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = { b: $(1) }));
($(1), a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
$(...a);
$(1);
const tmpAssignMemRhs /*:unknown*/ = $(2);
a.b = tmpAssignMemRhs;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$(...a);
$(1);
a.b = $(2);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( ...b );
$( 1 );
const c = $( 2 );
b.b = c;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
