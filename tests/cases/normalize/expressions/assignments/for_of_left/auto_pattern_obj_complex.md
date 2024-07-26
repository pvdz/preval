# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > For of left > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (({ a } = $({ a: 1, b: 2 })).x of $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
for (({ a: a } = $({ a: 1, b: 2 })).x of $({ x: 1 }));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  let tmpAssignMemLhsObj = undefined;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpAssignMemLhsObj = tmpNestedAssignObjPatternRhs;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
let a = 1;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpNestedAssignObjPatternRhs.x = tmpForOfLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d of c) {
  const e = {
    a: 1,
    b: 2,
  };
  const f = $( e );
  a = f.a;
  f.x = d;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
