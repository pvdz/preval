# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Binary right > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = []));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:string*/ = $coerce(tmpBinBothLhs, `plustr`);
$(tmpCalleeParam);
const a /*:array*/ /*truthy*/ = [];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) + ``);
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
$( b );
const c = [];
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = [];
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) array reads var statement with init BinaryExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '100'
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
