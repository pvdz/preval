# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > For of left > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for ($({ a: 1, b: 2 }).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
const a = $tdz$__pattern_after_default.a;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpAssignMemLhsObj = $(tmpCalleeParam$1);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
