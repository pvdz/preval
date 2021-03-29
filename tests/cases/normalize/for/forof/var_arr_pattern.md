# Preval test case

# var_arr_pattern.md

> Normalize > For > Forof > Var arr pattern
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let {x} of {a: 1, b: 2}) $(x);
`````

## Pre Normal

`````js filename=intro
for (let { x } of { a: 1, b: 2 }) $(x);
`````

## Normalized

`````js filename=intro
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
let tmpForOfPatDeclLhs;
let x;
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const tmpAssignObjPatternRhs = tmpForOfPatDeclLhs;
  x = tmpAssignObjPatternRhs.x;
  $(x);
}
`````

## Output

`````js filename=intro
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
let tmpForOfPatDeclLhs;
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const tmpAssignObjPatternRhs = tmpForOfPatDeclLhs;
  const tmpSSA_x = tmpAssignObjPatternRhs.x;
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
