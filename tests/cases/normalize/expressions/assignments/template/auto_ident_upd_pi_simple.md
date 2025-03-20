# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = ++b)}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
$(`before  2  after`);
$(2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  2  after`);
$(2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  2  after" );
$( 2, 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before 2 after'
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
