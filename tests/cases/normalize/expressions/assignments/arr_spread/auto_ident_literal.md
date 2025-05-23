# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = "foo")]);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`f`, `o`, `o`];
$(tmpCalleeParam);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`f`, `o`, `o`]);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "f", "o", "o" ];
$( a );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
const tmpArrSpread = a;
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['f', 'o', 'o']
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
