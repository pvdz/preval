# Preval test case

# 5.md

> normalize > pattern > param > _base > 5
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [[ x ]] = [[ 100 ]];
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = [100];
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1[0];
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
