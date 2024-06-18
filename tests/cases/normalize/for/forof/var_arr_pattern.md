# Preval test case

# var_arr_pattern.md

> Normalize > For > Forof > Var arr pattern
>
> For-in must be normalized

## Input

`````js filename=intro
for (let {x} of {a: 1, b: 2}) $(x);
`````

## Pre Normal


`````js filename=intro
for (let { x: x } of { a: 1, b: 2 }) $(x);
`````

## Normalized


`````js filename=intro
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
let tmpForOfPatDeclLhs = undefined;
let x = undefined;
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const tmpAssignObjPatternRhs = tmpForOfPatDeclLhs;
  x = tmpAssignObjPatternRhs.x;
  $(x);
}
`````

## Output


`````js filename=intro
let tmpForOfPatDeclLhs = undefined;
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const tmpClusterSSA_x = tmpForOfPatDeclLhs.x;
  $(tmpClusterSSA_x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 1,
  b: 2,
};
for (a of b) {
  const c = a.x;
  $( c );
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
