# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b).a;
$(a, b);
`````


## Settled


`````js filename=intro
$Number_prototype.a;
$(1, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.a;
$(1, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.a;
$( 1, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
