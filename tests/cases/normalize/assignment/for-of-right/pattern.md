# Preval test case

# pattern.md

> normalize > assignment > for-of-right > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (let x of ([x, y] = z));
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
  let tmpForOfLhsDecl;
  {
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    const tmpForOfRhs = arrAssignPatternRhs;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
    }
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let tmpForOfLhsDecl;
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
const tmpForOfRhs = arrAssignPatternRhs;
for (tmpForOfLhsDecl of tmpForOfRhs) {
  let x = tmpForOfLhsDecl;
}
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot access 'x' before initialization ]>

Normalized calls: BAD?!
[[10, 20, [10, 20, 30]], null];

Final output calls: BAD!!
[[10, 20, [10, 20, 30]], null];
