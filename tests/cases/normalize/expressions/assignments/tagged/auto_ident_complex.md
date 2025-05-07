# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = $(b))} after`;
$(a, b);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
$([`before `, ` after`], a);
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ "before ", " after" ];
$( b, a );
$( a, 1 );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 1
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
