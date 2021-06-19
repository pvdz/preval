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
$(`A` + a + `B` + b + `C`);
$(`A` + (`A` + a + `B` + b + `C`) + `B` + (`A` + a + `B` + b + `C`) + `C`);
`````

## Normalized

`````js filename=intro
const a = $(`x`);
const b = $(`y`);
const tmpCallCallee = $;
const tmpBinLhs$3 = `A` + a;
const tmpBinLhs$1 = tmpBinLhs$3 + `B`;
const tmpBinLhs = tmpBinLhs$1 + b;
const tmpCalleeParam = tmpBinLhs + `C`;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpBinBothLhs$1 = `A`;
const tmpBinLhs$13 = `A` + a;
const tmpBinLhs$11 = tmpBinLhs$13 + `B`;
const tmpBinLhs$9 = tmpBinLhs$11 + b;
const tmpBinBothRhs$1 = tmpBinLhs$9 + `C`;
const tmpBinLhs$7 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = tmpBinLhs$7 + `B`;
const tmpBinLhs$19 = `A` + a;
const tmpBinLhs$17 = tmpBinLhs$19 + `B`;
const tmpBinLhs$15 = tmpBinLhs$17 + b;
const tmpBinBothRhs = tmpBinLhs$15 + `C`;
const tmpBinLhs$5 = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam$1 = tmpBinLhs$5 + `C`;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const a = $(`x`);
const b = $(`y`);
const tmpBinLhs$3 = `A` + a;
const tmpBinLhs$1 = `${tmpBinLhs$3}B`;
const tmpBinLhs = tmpBinLhs$1 + b;
const tmpCalleeParam = `${tmpBinLhs}C`;
$(tmpCalleeParam);
const tmpBinLhs$13 = `A` + a;
const tmpBinLhs$11 = `${tmpBinLhs$13}B`;
const tmpBinLhs$9 = tmpBinLhs$11 + b;
const tmpBinLhs$19 = `A` + a;
const tmpBinLhs$17 = `${tmpBinLhs$19}B`;
const tmpBinLhs$15 = tmpBinLhs$17 + b;
const tmpCalleeParam$1 = `A${tmpBinLhs$9}CB${tmpBinLhs$15}CC`;
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
