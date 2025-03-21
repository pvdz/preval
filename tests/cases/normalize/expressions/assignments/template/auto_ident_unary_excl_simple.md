# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = !arg)}  after`);
$(a, arg);
`````

## Settled


`````js filename=intro
$(`before  false  after`);
$(false, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  false  after`);
$(false, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = !arg), `string`) + `  after`);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
a = !arg;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before  false  after" );
$( false, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'before false after'
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
