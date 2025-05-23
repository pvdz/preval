# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Arr element > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") + (a = "foo"));
$(a);
`````


## Settled


`````js filename=intro
$(`foofoo`);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foofoo`);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "foofoo" );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
const tmpBinBothLhs = a;
a = `foo`;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foofoo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
