# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > obj-prop-dyn > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$({[([x, y] = ($(x), $(y), z))]: 1000});
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpComputedKey = arrAssignPatternRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpComputedKey = arrAssignPatternRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: {"10,20,30":1000}
 - 3: 10,20,[10,20,30]
 - 4: undefined

Normalized calls: Same

Final output calls: Same
