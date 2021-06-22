# Preval test case

# nested_multi.md

> Templates > Nested multi
>
> A nested template should be merged down

#TODO

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
$(`A` + String(a) + `B` + String(b) + `C`);
$(`A` + String(`A` + String(a) + `B` + String(b) + `C`) + `B` + String(`A` + String(a) + `B` + String(b) + `C`) + `C`);
`````

## Normalized

`````js filename=intro
const a = $(`x`);
const b = $(`y`);
const tmpCallCallee = $;
const tmpBinBothLhs$1 = `A`;
const tmpBinBothRhs$1 = String(a);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = tmpBinLhs$1 + `B`;
const tmpBinBothRhs = String(b);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `C`;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpBinBothLhs$5 = `A`;
const tmpCallCallee$3 = String;
const tmpBinBothLhs$9 = `A`;
const tmpBinBothRhs$9 = String(a);
const tmpBinLhs$9 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
const tmpBinBothLhs$7 = tmpBinLhs$9 + `B`;
const tmpBinBothRhs$7 = String(b);
const tmpBinLhs$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpCalleeParam$3 = tmpBinLhs$7 + `C`;
const tmpBinBothRhs$5 = tmpCallCallee$3(tmpCalleeParam$3);
const tmpBinLhs$5 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
const tmpBinBothLhs$3 = tmpBinLhs$5 + `B`;
const tmpCallCallee$5 = String;
const tmpBinBothLhs$13 = `A`;
const tmpBinBothRhs$13 = String(a);
const tmpBinLhs$13 = tmpBinBothLhs$13 + tmpBinBothRhs$13;
const tmpBinBothLhs$11 = tmpBinLhs$13 + `B`;
const tmpBinBothRhs$11 = String(b);
const tmpBinLhs$11 = tmpBinBothLhs$11 + tmpBinBothRhs$11;
const tmpCalleeParam$5 = tmpBinLhs$11 + `C`;
const tmpBinBothRhs$3 = tmpCallCallee$5(tmpCalleeParam$5);
const tmpBinLhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const tmpCalleeParam$1 = tmpBinLhs$3 + `C`;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const a = $(`x`);
const b = $(`y`);
const tmpBinBothRhs$1 = String(a);
const tmpBinBothRhs = String(b);
const tmpCalleeParam = `A${tmpBinBothRhs$1}B${tmpBinBothRhs}C`;
$(tmpCalleeParam);
const tmpBinBothRhs$9 = String(a);
const tmpBinBothRhs$7 = String(b);
const tmpBinBothRhs$13 = String(a);
const tmpBinBothRhs$11 = String(b);
const tmpCalleeParam$1 = `AA${tmpBinBothRhs$9}B${tmpBinBothRhs$7}CBA${tmpBinBothRhs$13}B${tmpBinBothRhs$11}CC`;
$(tmpCalleeParam$1);
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
