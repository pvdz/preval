# Preval test case

# reg.md

> random > reg
>
> meh

#TODO

## Input

`````js filename=intro
let b = [];
let c;
c = ([b] = [2]) === 1;
$(b, c);
`````

## Normalized

`````js filename=intro
let b = [];
let c;
let tmpBinLhs;
const tmpNestedAssignArrPatternRhs = [2];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpBinLhs = tmpNestedAssignArrPatternRhs;
c = tmpBinLhs === 1;
$(b, c);
`````

## Output

`````js filename=intro
let b = [];
let c;
let tmpBinLhs;
const tmpNestedAssignArrPatternRhs = [2];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpBinLhs = tmpNestedAssignArrPatternRhs;
c = tmpBinLhs === 1;
$(b, c);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
