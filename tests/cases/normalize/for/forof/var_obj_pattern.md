# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let [x] of {a: 1, b: 2}) $(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
{
  const tmpForOfPatDeclRhs = { a: 1, b: 2 };
  let tmpForOfPatDeclLhs;
  let x;
  for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
    arrAssignPatternRhs = tmpForOfPatDeclLhs;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    arrAssignPatternRhs;
    $(x);
  }
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
let tmpForOfPatDeclLhs;
let x;
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  arrAssignPatternRhs = tmpForOfPatDeclLhs;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
}
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
