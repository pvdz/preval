# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Tagged > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = b)} after`;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, 1);
$(1, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], 1);
$(1, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 1 );
$( 1, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
a = b;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a, b);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['before ', ' after'], 1
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
