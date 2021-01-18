# Preval test case

# simple_pattern.md

> normalize > assignment > switch-discriminant > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
switch (a = [x, y] = z) {}
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  tmpNestedComplexRhs = arrPatternSplat[1];
  y = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  const tmpSwitchTest = a;
  {
    let tmpFallthrough = false;
  }
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
$(a, x, y, z);
`````

## Result

Should call `$` with:
[[[10, 20, 30], 10, 20, [10, 20, 30]], null];

Normalized calls: BAD?!
[[20, 10, 20, [10, 20, 30]], null];

Final output calls: BAD!!
[[20, 10, 20, [10, 20, 30]], null];

