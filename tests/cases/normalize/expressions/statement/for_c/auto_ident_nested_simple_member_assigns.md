# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > for_c > auto_ident_nested_simple_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (; $(1); b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpAssignMemLhsObj = b;
      let tmpAssignMemRhs;
      let tmpNestedAssignPropRhs;
      let tmpNestedAssignPropRhs$1;
      let tmpNestedAssignPropRhs$2;
      let tmpNestedAssignPropRhs$3;
      const tmpNestedPropAssignRhs = c;
      b.x = tmpNestedPropAssignRhs;
      tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$3;
      b.x = tmpNestedPropAssignRhs$1;
      tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$1;
      const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$2;
      b.x = tmpNestedPropAssignRhs$2;
      tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$2;
      const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$1;
      b.x = tmpNestedPropAssignRhs$3;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$3;
      const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs;
      b.x = tmpNestedPropAssignRhs$4;
      tmpAssignMemRhs = tmpNestedPropAssignRhs$4;
      tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignMemLhsObj = b;
    let tmpAssignMemRhs;
    let tmpNestedAssignPropRhs;
    let tmpNestedAssignPropRhs$1;
    let tmpNestedAssignPropRhs$2;
    let tmpNestedAssignPropRhs$3;
    b.x = 3;
    tmpNestedAssignPropRhs$3 = 3;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$3;
    b.x = tmpNestedPropAssignRhs$1;
    tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$1;
    const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$2;
    b.x = tmpNestedPropAssignRhs$2;
    tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$2;
    const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$1;
    b.x = tmpNestedPropAssignRhs$3;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$3;
    const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs;
    b.x = tmpNestedPropAssignRhs$4;
    tmpAssignMemRhs = tmpNestedPropAssignRhs$4;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
