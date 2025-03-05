# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Statement > Template > Auto ident unary minus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${-$(100)}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(-$(100), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpUnaryArg = $(100);
const tmpCalleeParam$1 = -tmpUnaryArg;
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const tmpCalleeParam$2 /*:number*/ = $$0;
  debugger;
  const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$2, `string`);
  const tmpRet /*:string*/ = `before  ${tmpBinBothRhs}  after`;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpCalleeParam$1 /*:number*/ = -tmpUnaryArg;
const tmpCalleeParam /*:string*/ = $frfr(tmpFree, tmpCalleeParam$1);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
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
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'before -100 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
