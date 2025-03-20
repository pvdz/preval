# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident delete computed c-seq complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete ($(1), $(2), $(arg))[$("y")];
    $(a, arg);
}
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpClusterSSA_arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(tmpClusterSSA_arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(tmpClusterSSA_a, tmpClusterSSA_arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpClusterSSA_arg = { y: 1 };
const tmpDeleteCompObj = $(tmpClusterSSA_arg);
const tmpDeleteCompProp = $(`y`);
$(delete tmpDeleteCompObj[tmpDeleteCompProp], tmpClusterSSA_arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
$( d, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
