# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = void arg)}  after`);
$(a, arg);
`````


## Settled


`````js filename=intro
$(`before  undefined  after`);
$(undefined, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  undefined  after`);
$(undefined, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  undefined  after" );
$( undefined, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
a = undefined;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before undefined after'
 - 2: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
