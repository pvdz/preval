# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Template > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(`before  ${([b] = $([$(2)]))}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(`before  ` + String(([b] = $([$(2)]))) + `  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
let tmpCalleeParam$1 = undefined;
const tmpCallCallee$3 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$3 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$3(tmpCalleeParam$3);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(2);
const tmpCalleeParam$3 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$3);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b = arrPatternSplat[0];
const tmpBinBothRhs = String(tmpNestedAssignArrPatternRhs);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a, tmpClusterSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 'before 2 after'
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
