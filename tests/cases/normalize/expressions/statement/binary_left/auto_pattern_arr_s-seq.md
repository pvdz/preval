# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > Binary left > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
($(10), $(20), [1, 2]) + $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
($(10), $(20), [1, 2]) + $(100);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(10);
$(20);
const tmpBinBothLhs = [1, 2];
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(10);
$(20);
const tmpBinBothLhs = [1, 2];
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
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
