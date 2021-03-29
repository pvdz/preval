# Preval test case

# var_obj_pattern.md

> Normalize > For > Forof > Var obj pattern
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let [x] of {a: 1, b: 2}) $(x);
`````

## Pre Normal

`````js filename=intro
for (let [x] of { a: 1, b: 2 }) $(x);
`````

## Normalized

`````js filename=intro
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
let tmpForOfPatDeclLhs = undefined;
let x = undefined;
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const arrAssignPatternRhs = tmpForOfPatDeclLhs;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
}
`````

## Output

`````js filename=intro
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
let tmpForOfPatDeclLhs = undefined;
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const arrAssignPatternRhs = tmpForOfPatDeclLhs;
  const arrPatternSplat = [...arrAssignPatternRhs];
  const tmpSSA_x = arrPatternSplat[0];
  $(tmpSSA_x);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
