# Preval test case

# auto_ident_prop_s-seq.md

> normalize > expressions > assignments > for_of_left > auto_ident_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for ((a = (1, 2, b).c).x of $({ x: 1 }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj;
    1;
    2;
    const tmpCompObj = b;
    const tmpNestedComplexRhs = tmpCompObj.c;
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  let tmpAssignMemLhsObj;
  const tmpCompObj = b;
  const tmpNestedComplexRhs = tmpCompObj.c;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
