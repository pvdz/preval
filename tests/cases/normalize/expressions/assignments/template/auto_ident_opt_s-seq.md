# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Template > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = (1, 2, b)?.x)}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(`before  1  after`);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  1  after`);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  1  after" );
$( 1 );
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before 1 after'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
