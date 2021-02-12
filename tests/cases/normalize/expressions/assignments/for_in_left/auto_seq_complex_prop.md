# Preval test case

# auto_seq_complex_prop.md

> normalize > expressions > assignments > for_in_left > auto_seq_complex_prop
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = { b: $(1) }).x in $({ x: 1 }));
($(1), $(a)).b = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    const tmpObjLitVal = $(1);
    const tmpNestedComplexRhs = { b: tmpObjLitVal };
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(1);
const tmpAssignMemLhsObj$1 = $(a);
const tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$2.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    const tmpObjLitVal = $(1);
    const tmpNestedComplexRhs = { b: tmpObjLitVal };
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(1);
const tmpAssignMemLhsObj$1 = $(a);
const tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$2.b = tmpAssignMemRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - 4: { b: '1', x: '"x"' }
 - 5: 2
 - 6: { b: '2', x: '"x"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
