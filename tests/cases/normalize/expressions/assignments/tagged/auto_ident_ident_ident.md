# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Tagged > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$`before ${(a = b = 2)} after`;
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, 2);
$(2, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], 2);
$(2, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 2 );
$( 2, 2, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
b = 2;
a = 2;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a, b, c);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['before ', ' after'], 2
 - 2: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
