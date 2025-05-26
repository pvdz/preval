# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = typeof $(arg))} after`;
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:string*/ = typeof tmpUnaryArg;
$(tmpCalleeParam, a);
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const tmpCalleeParam = [`before `, ` after`];
const a = typeof tmpUnaryArg;
$(tmpCalleeParam, a);
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ "before ", " after" ];
const c = typeof a;
$( b, c );
$( c, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a, arg);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 'number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
