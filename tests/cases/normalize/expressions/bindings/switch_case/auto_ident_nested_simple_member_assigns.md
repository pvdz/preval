# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Bindings > Switch case > Auto ident nested simple member assigns
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = 3;

    let a = (b.x = b.x = b.x = b.x = b.x = b.x = c);
    $(a, b, c);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { x: 3 };
$(3, tmpClusterSSA_b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 3 };
$( 3, a, 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
