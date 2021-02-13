# Preval test case

# auto_seq_simple_prop.md

> normalize > expressions > assignments > for_of_left > auto_seq_simple_prop
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x of $({ x: 1 }));
($(1), a).b = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const tmpObjLitVal = $(1);
    a = { b: tmpObjLitVal };
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(1);
const tmpAssignMemLhsObj$1 = a;
const tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$2.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const tmpObjLitVal = $(1);
    a = { b: tmpObjLitVal };
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(1);
const tmpAssignMemLhsObj$1 = a;
const tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$2.b = tmpAssignMemRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same