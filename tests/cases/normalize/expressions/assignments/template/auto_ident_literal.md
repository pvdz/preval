# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Template > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = "foo")}  after`);
$(a);
`````


## Settled


`````js filename=intro
$(`before  foo  after`);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  foo  after`);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  foo  after" );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
a = `foo`;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before foo after'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
