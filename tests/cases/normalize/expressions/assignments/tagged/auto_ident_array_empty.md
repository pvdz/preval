# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Tagged > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = [])} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
const a /*:array*/ /*truthy*/ = [];
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
const a = [];
$(tmpCalleeParam, a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = [];
$( a, b );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
a = [];
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['before ', ' after'], []
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
