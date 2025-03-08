# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = b--)}  after`);
$(a, b);
`````

## Settled


`````js filename=intro
$(`before  1  after`);
$(1, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  1  after`);
$(1, 0);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = b--), `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
a = tmpPostUpdArgIdent;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before  1  after" );
$( 1, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'before 1 after'
 - 2: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
