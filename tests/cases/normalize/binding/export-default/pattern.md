# Preval test case

# pattern.md

> normalize > assignment > export-default > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let z = [10, 20, 30];
export let [x, y] = z;
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
export default ((arrAssignPatternRhs = z),
(arrPatternSplat = [...arrAssignPatternRhs]),
(x = arrPatternSplat[0]),
(y = arrPatternSplat[1]),
arrAssignPatternRhs);
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
export default ((arrAssignPatternRhs = z),
(arrPatternSplat = [...arrAssignPatternRhs]),
(x = arrPatternSplat[0]),
(y = arrPatternSplat[1]),
arrAssignPatternRhs);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
