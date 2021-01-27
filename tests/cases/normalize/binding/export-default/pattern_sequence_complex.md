# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > export-default > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, z = [10, 20, 30];
export let [x, y] = ($(a), $(b), $(z));
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
(arrAssignPatternRhs = $(z)),
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
(arrAssignPatternRhs = $(z)),
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
