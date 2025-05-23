# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = void $(100))} after`;
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$([`before `, ` after`], undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = [ "before ", " after" ];
$( a, undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
$(100);
a = undefined;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: ['before ', ' after'], undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
