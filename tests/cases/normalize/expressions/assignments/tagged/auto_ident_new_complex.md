# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = new ($($))(1))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const a /*:object*/ /*truthy*/ = new tmpNewCallee(1);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
$([`before `, ` after`], a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
const c = [ "before ", " after" ];
$( c, b );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
const tmpNewCallee = $($);
a = new tmpNewCallee(1);
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
 - 1: '<$>'
 - 2: 1
 - 3: ['before ', ' after'], {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
