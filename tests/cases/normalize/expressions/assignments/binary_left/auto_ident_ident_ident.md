# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Binary left > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$((a = b = 2) + $(100));
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = 2 + tmpBinBothRhs;
$(tmpCalleeParam);
$(2, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(100);
$(2 + tmpBinBothRhs);
$(2, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = 2 + a;
$( b );
$( 2, 2, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
const tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 102
 - 3: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
