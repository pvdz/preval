# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident upd mi simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = --b;
    $(a, b);
}
`````


## Settled


`````js filename=intro
$(0, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0, 0 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
