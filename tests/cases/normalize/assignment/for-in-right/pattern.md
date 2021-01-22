# Preval test case

# pattern.md

> normalize > assignment > for-in-right > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (let x in ([x, y] = z));
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
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  const tmpForInDeclRhs = arrAssignPatternRhs;
  let x;
  for (x in tmpForInDeclRhs) {
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
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
const tmpForInDeclRhs = arrAssignPatternRhs;
let x;
for (x in tmpForInDeclRhs) {
}
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot access 'x' before initialization ]>

Normalized calls: Same

Final output calls: BAD!!
["<crash[ Identifier 'x' has already been declared ]>"];

