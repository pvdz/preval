# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = -$(100))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = -$(100)), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpCallCallee$1 = a;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const a$1 /*:number*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(a$1, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = -tmpUnaryArg;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, a);
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  return e;
};
const f = $( 100 );
const g = -f;
const h = i( a, g );
$( h );
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'before -100 after'
 - 3: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
