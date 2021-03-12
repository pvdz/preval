# Preval test case

# pattern.md

> Normalize > Binding > Stmt-global-top > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let [a, b] = z;
$(a, b, x, y, z);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2,
  z = [10, 20, 30];
let [a, b] = z;
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let bindingPatternArrRoot = z;
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let b = arrPatternSplat[1];
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
const z = [10, 20, 30];
const arrPatternSplat = [...z];
const a = arrPatternSplat[0];
const b = arrPatternSplat[1];
$(a, b, 1, 2, z);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 20, 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
