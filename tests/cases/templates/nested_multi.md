# Preval test case

# nested_multi.md

> Templates > Nested multi
>
> A nested template should be merged down

## Input

`````js filename=intro
const a = $('x');
const b = $('y');
// Single level
$(`A${a}B${b}C`);
// Multi level
$(`A${`A${a}B${b}C`}B${`A${a}B${b}C`}C`);
`````

## Pre Normal


`````js filename=intro
const a = $(`x`);
const b = $(`y`);
$(`A` + $coerce(a, `string`) + `B` + $coerce(b, `string`) + `C`);
$(
  `A` +
    $coerce(`A` + $coerce(a, `string`) + `B` + $coerce(b, `string`) + `C`, `string`) +
    `B` +
    $coerce(`A` + $coerce(a, `string`) + `B` + $coerce(b, `string`) + `C`, `string`) +
    `C`,
);
`````

## Normalized


`````js filename=intro
const a = $(`x`);
const b = $(`y`);
const tmpCallCallee = $;
const tmpBinBothLhs$1 = `A`;
const tmpBinBothRhs$1 = $coerce(a, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR}B`;
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR$1}C`;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpBinBothLhs$5 = `A`;
const tmpBinBothLhs$9 = `A`;
const tmpBinBothRhs$9 = $coerce(a, `string`);
const tmpBinLhs$9 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
const tmpStringConcatR$3 = $coerce(tmpBinLhs$9, `plustr`);
const tmpBinBothLhs$7 = `${tmpStringConcatR$3}B`;
const tmpBinBothRhs$7 = $coerce(b, `string`);
const tmpBinLhs$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpStringConcatR$5 = $coerce(tmpBinLhs$7, `plustr`);
const tmpCallCallee$3 = `${tmpStringConcatR$5}C`;
const tmpBinBothRhs$5 = $coerce(tmpCallCallee$3, `string`);
const tmpBinLhs$5 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
const tmpStringConcatR$7 = $coerce(tmpBinLhs$5, `plustr`);
const tmpBinBothLhs$3 = `${tmpStringConcatR$7}B`;
const tmpBinBothLhs$13 = `A`;
const tmpBinBothRhs$13 = $coerce(a, `string`);
const tmpBinLhs$13 = tmpBinBothLhs$13 + tmpBinBothRhs$13;
const tmpStringConcatR$9 = $coerce(tmpBinLhs$13, `plustr`);
const tmpBinBothLhs$11 = `${tmpStringConcatR$9}B`;
const tmpBinBothRhs$11 = $coerce(b, `string`);
const tmpBinLhs$11 = tmpBinBothLhs$11 + tmpBinBothRhs$11;
const tmpStringConcatR$11 = $coerce(tmpBinLhs$11, `plustr`);
const tmpCallCallee$5 = `${tmpStringConcatR$11}C`;
const tmpBinBothRhs$3 = $coerce(tmpCallCallee$5, `string`);
const tmpBinLhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const tmpStringConcatR$13 = $coerce(tmpBinLhs$3, `plustr`);
const tmpCalleeParam$1 = `${tmpStringConcatR$13}C`;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const a = $(`x`);
const b = $(`y`);
const tmpBinBothRhs$1 = $coerce(a, `string`);
const tmpBinBothRhs = $coerce(b, `string`);
const tmpCalleeParam = `A${tmpBinBothRhs$1}B${tmpBinBothRhs}C`;
$(tmpCalleeParam);
const tmpBinBothRhs$9 = $coerce(a, `string`);
const tmpBinBothRhs$7 = $coerce(b, `string`);
const tmpBinBothRhs$13 = $coerce(a, `string`);
const tmpBinBothRhs$11 = $coerce(b, `string`);
const tmpCalleeParam$1 = `AA${tmpBinBothRhs$9}B${tmpBinBothRhs$7}CBA${tmpBinBothRhs$13}B${tmpBinBothRhs$11}CC`;
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "x" );
const b = $( "y" );
const c = $coerce( a, "string" );
const d = $coerce( b, "string" );
const e = `A${tmpBinBothRhs$1}B`;
$( e );
const f = $coerce( a, "string" );
const g = $coerce( b, "string" );
const h = $coerce( a, "string" );
const i = $coerce( b, "string" );
const j = `AA${tmpBinBothRhs$9}B`;
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - 3: 'AxByC'
 - 4: 'AAxByCBAxByCC'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
