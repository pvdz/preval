# Preval test case

# ident_logic_and_simple_simple2.md

> Normalize > Expressions > Assignments > Template > Ident logic and simple simple2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && 2) + `after`);
$(a);
`````


## Settled


`````js filename=intro
$(`2after`);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`2after`);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "2after" );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  a = 2;
} else {
}
const tmpBinLhs = a;
const tmpStringConcatR = $coerce(a, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '2after'
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
