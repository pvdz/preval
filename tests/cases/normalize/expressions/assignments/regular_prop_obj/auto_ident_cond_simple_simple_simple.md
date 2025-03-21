# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident cond simple simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = 1 ? 2 : $($(100))).a;
$(a);
`````


## Settled


`````js filename=intro
(2).a;
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(2).a;
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
2.a;
$( 2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
