# Preval test case

# auto_ident_unary_typeof_simple.md

> normalize > expressions > assignments > for_of_left > auto_ident_unary_typeof_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for ((a = typeof arg).x of $({ x: 1 }));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  a = typeof arg;
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, arg);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  a = 'number';
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
