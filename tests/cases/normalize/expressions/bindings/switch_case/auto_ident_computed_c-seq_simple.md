# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = (1, 2, $(b))[$("c")];
    $(a, b);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { c: 1 };
const tmpAssignRhsCompObj /*:unknown*/ = $(tmpClusterSSA_b);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_b = { c: 1 };
const tmpAssignRhsCompObj = $(tmpClusterSSA_b);
const tmpAssignRhsCompProp = $(`c`);
$(tmpAssignRhsCompObj[tmpAssignRhsCompProp], tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
$( d, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
