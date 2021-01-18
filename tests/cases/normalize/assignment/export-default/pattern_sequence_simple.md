# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > export-default > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
export default [x, y] = ($(x), $(y), z);
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
export default ($(x),
$(y),
(arrAssignPatternRhs = z),
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
export default ($(x),
$(y),
(arrAssignPatternRhs = z),
(arrPatternSplat = [...arrAssignPatternRhs]),
(x = arrPatternSplat[0]),
(y = arrPatternSplat[1]),
arrAssignPatternRhs);
$(x, y, z);
`````

## Result

Should call `$` with:
["<crash[ Unexpected token 'export' ]>"];

Normalized calls: Same

Final output calls: Same
