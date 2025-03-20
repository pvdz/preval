# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Bindings > Switch case > Auto ident call ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1);
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(1);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
