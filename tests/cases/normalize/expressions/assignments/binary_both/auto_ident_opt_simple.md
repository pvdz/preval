# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = b?.x) + (a = b?.x));
$(a);
`````


## Settled


`````js filename=intro
$(2);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
