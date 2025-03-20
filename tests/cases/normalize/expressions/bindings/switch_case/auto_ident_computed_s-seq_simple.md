# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = (1, 2, b)[$("c")];
    $(a, b);
}
`````


## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const tmpClusterSSA_b /*:object*/ = { c: 1 };
const tmpClusterSSA_a /*:unknown*/ = tmpClusterSSA_b[tmpAssignRhsCompProp];
$(tmpClusterSSA_a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const tmpClusterSSA_b = { c: 1 };
$(tmpClusterSSA_b[tmpAssignRhsCompProp], tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( c, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
