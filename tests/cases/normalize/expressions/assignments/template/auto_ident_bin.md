# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Template > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $(1) + $(2))}  after`);
$(a);
`````

## Settled


`````js filename=intro
const tmpFree /*:(primitive)=>string*/ = function $free($$0) {
  const a$1 /*:primitive*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(a$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const tmpBinBothLhs$1 /*:unknown*/ = $(1);
const tmpBinBothRhs$1 /*:unknown*/ = $(2);
const a /*:primitive*/ = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, a);
$(tmpCalleeParam);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(a$1) {
  const tmpRet = `before  ${a$1}  after`;
  return tmpRet;
};
const a = $(1) + $(2);
$($frfr(tmpFree, a));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $(1) + $(2)), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
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
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  return e;
};
const f = $( 1 );
const g = $( 2 );
const h = f + g;
const i = j( a, h );
$( i );
$( h );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'before 3 after'
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
