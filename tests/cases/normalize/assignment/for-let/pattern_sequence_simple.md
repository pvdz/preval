# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > for-let > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (let wat = [x, y] = ($(x), $(y), z); false;);
$(wat);
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  $(x);
  $(y);
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  let wat_1 = arrAssignPatternRhs;
  while (false) {}
}
$(wat_1);
$(x, y, z);
`````

## Output

`````js filename=intro
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
let wat_1 = arrAssignPatternRhs;
while (false) {}
$(wat_1);
$(x, y, z);
`````

## Result

Should call `$` with:
[[1], [2], '<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: BAD!!
[[1], [2], [[10, 20, 30]], [10, 20, [10, 20, 30]], null];

