# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Template > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = [])}  after`);
$(a);
`````

## Settled


`````js filename=intro
$(`before    after`);
const a /*:array*/ = [];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before    after`);
$([]);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = []), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
a = [];
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before    after" );
const a = [];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'before after'
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
