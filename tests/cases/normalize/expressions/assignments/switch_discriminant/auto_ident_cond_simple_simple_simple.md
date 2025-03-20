# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident cond simple simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = 1 ? 2 : $($(100)))) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
$(100);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
