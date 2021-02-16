# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let {x} of {a: 1, b: 2}) $(x);
`````

## Normalized

`````js filename=intro
{
  const tmpForOfPatDeclRhs = { a: 1, b: 2 };
  let tmpForOfPatDeclLhs;
  let x;
  for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
    const tmpAssignObjPatternRhs = tmpForOfPatDeclLhs;
    x = tmpAssignObjPatternRhs.x;
    $(x);
  }
}
`````

## Output

`````js filename=intro
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
let tmpForOfPatDeclLhs;
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const tmpAssignObjPatternRhs = tmpForOfPatDeclLhs;
  const x = tmpAssignObjPatternRhs.x;
  $(x);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
