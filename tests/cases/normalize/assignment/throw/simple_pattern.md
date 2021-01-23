# Preval test case

# simple_pattern.md

> normalize > assignment > throw > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
throw a = [x, y] = z;
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
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
  y = arrPatternSplat[1];
  a = arrAssignPatternRhs;
  let tmpThrowArg = a;
  throw tmpThrowArg;
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = arrAssignPatternRhs;
let tmpThrowArg = a;
throw tmpThrowArg;
$(a, x, y, z);
`````

## Result

Should call `$` with:
 - 0: <crash[ 10,20,30 ]>

Normalized calls: Same

Final output calls: Same
