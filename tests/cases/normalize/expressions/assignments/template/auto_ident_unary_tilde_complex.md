# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = ~$(100))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = ~$(100)), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
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
const tmpUnaryArg = $(100);
const a /*:number*/ = ~tmpUnaryArg;
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
const c = $coerce( b, "string" );
const d = `before  ${c}  after`;
$( d );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'before -101 after'
 - 3: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
