# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident prop s-seq assign simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = (1, 2, b).c = 2)}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
$(`before  2  after`);
const b /*:object*/ = { c: 2 };
$(2, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  2  after`);
$(2, { c: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  2  after" );
const a = { c: 2 };
$( 2, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before 2 after'
 - 2: 2, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
