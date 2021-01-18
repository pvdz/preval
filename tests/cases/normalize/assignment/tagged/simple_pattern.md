# Preval test case

# simple_pattern.md

> normalize > assignment > tagged > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
$`abc ${a = [x, y] = z} def`
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = ['abc ', ' def'];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpNestedComplexRhs = arrAssignPatternRhs;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = ['abc ', ' def'];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpNestedComplexRhs = arrAssignPatternRhs;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, x, y, z);
`````

## Result

Should call `$` with:
[
  [
    ['abc ', ' def'],
    [10, 20, 30],
  ],
  [[10, 20, 30], 10, 20, [10, 20, 30]],
  null,
];

Normalized calls: Same

Final output calls: Same
