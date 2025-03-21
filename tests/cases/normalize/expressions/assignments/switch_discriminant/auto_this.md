# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = this)) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
$(100);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
