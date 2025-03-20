# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond simple complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 1 ? $(2) : $($(100));
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(2);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
