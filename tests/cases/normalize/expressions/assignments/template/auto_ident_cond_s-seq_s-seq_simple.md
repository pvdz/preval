# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = (10, 20, 30) ? (40, 50, 60) : $($(100)))}  after`);
$(a);
`````

## Settled


`````js filename=intro
$(`before  60  after`);
$(60);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  60  after`);
$(60);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = (10, 20, 30) ? (40, 50, 60) : $($(100))), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
}
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before  60  after" );
$( 60 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'before 60 after'
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
