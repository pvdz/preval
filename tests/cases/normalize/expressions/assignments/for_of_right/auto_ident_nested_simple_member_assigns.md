# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > for_of_right > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (let x of (a = b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
{
  const varInitAssignLhsComputedRhs$4 = c;
  b.x = varInitAssignLhsComputedRhs$4;
  const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
  b.x = varInitAssignLhsComputedRhs$3;
  const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
  b.x = varInitAssignLhsComputedRhs$2;
  const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
  b.x = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
{
  const varInitAssignLhsComputedRhs$4 = c;
  b.x = varInitAssignLhsComputedRhs$4;
  const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
  b.x = varInitAssignLhsComputedRhs$3;
  const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
  b.x = varInitAssignLhsComputedRhs$2;
  const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
  b.x = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
