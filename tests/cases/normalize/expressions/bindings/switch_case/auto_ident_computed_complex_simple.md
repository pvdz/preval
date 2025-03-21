# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident computed complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = $(b)["c"];
    $(a, b);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(tmpClusterSSA_b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_b = { c: 1 };
$($(tmpClusterSSA_b).c, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
$( c, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
