# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident delete computed simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete arg["y"];
    $(a, arg);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_arg /*:object*/ = { y: 1 };
const tmpClusterSSA_a /*:boolean*/ = delete tmpClusterSSA_arg.y;
$(tmpClusterSSA_a, tmpClusterSSA_arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_arg = { y: 1 };
$(delete tmpClusterSSA_arg.y, tmpClusterSSA_arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
$( b, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
