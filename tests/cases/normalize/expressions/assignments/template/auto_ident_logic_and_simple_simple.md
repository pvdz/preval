# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = 1 && 2)}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(`before  2  after`);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  2  after`);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  2  after" );
$( 2 );
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before 2 after'
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
