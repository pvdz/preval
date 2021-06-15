# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > Template > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(`before  ${($(10), $(20), $([1, 2]))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(`before  ` + ($(10), $(20), $([1, 2])) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
$(10);
$(20);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = [1, 2];
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam$1 = [1, 2];
const tmpBinBothRhs = $(tmpCalleeParam$1);
const tmpBinLhs = `before  ` + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
