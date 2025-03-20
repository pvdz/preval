# Preval test case

# auto_seq_simple_prop.md

> Normalize > Expressions > Assignments > Return > Auto seq simple prop
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = { b: $(1) });
}
$(f());
($(1), a).b = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:object*/ = { b: tmpObjLitVal };
$(tmpClusterSSA_a);
$(1);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpClusterSSA_a.b = tmpAssignMemRhs;
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpClusterSSA_a = { b: tmpObjLitVal };
$(tmpClusterSSA_a);
$(1);
tmpClusterSSA_a.b = $(2);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( b );
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
 - 2: { b: '1' }
 - 3: 1
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
