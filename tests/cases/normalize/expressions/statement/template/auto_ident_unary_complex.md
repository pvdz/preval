# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Template > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(`before  ${typeof $(x)}  after`);
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(typeof $(x), `string`) + `  after`);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpUnaryArg = $(x);
const tmpCallCallee$1 = typeof tmpUnaryArg;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
const tmpCallCallee$1 = typeof tmpUnaryArg;
const tmpCalleeParam = `before  ${tmpCallCallee$1}  after`;
$(tmpCalleeParam);
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
const c = `before  ${tmpCallCallee$1}  after`;
$( c );
const d = {
  a: 999,
  b: 1000,
};
$( d, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before number after'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
