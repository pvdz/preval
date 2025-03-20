# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt extended
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: { z: 100 } } };

    let a = b?.x.y.z;
    $(a);
}
`````


## Settled


`````js filename=intro
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
