# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident opt simple opt simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
let obj = {};
(a = b?.x?.y).a;
$(a);
`````


## Settled


`````js filename=intro
(1).a;
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).a;
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
1.a;
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
