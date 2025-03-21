# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident delete prop complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete $(arg).y;
    $(a, arg);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(tmpClusterSSA_arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
$(tmpClusterSSA_a, tmpClusterSSA_arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_arg = { y: 1 };
const tmpDeleteObj = $(tmpClusterSSA_arg);
$(delete tmpDeleteObj.y, tmpClusterSSA_arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
$( c, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
