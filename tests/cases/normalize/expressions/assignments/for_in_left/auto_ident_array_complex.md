# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > for_in_left > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = [$(1), 2, $(3)]).x in $({ x: 1 }));
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
    const tmpArrElement = $(1);
    const tmpArrElement$1 = 2;
    const tmpArrElement$2 = $(3);
    const tmpNestedComplexRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj;
  const tmpArrElement = $(1);
  const tmpArrElement$2 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement, 2, tmpArrElement$2];
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 3
 - 4: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
