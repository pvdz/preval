# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = [1, 2, 3])}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(`before  1,2,3  after`);
const a /*:array*/ = [1, 2, 3];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  1,2,3  after`);
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  1,2,3  after" );
const a = [ 1, 2, 3 ];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before 1,2,3 after'
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
