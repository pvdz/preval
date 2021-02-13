# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > assignments > for_let > auto_ident_nested_member_complex_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for (let xyz = (a = $(b)[$("x")] = $(c)[$("y")] = d + e); ; $(1)) $(xyz);
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
{
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $('y');
  const varInitAssignLhsComputedRhs = d + e;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let a = { a: 999, b: 1000 };
{
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $('y');
  const varInitAssignLhsComputedRhs = 3 + 4;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b, c, 3, 4);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 7
 - 6: 1
 - 7: 7
 - 8: 1
 - 9: 7
 - 10: 1
 - 11: 7
 - 12: 1
 - 13: 7
 - 14: 1
 - 15: 7
 - 16: 1
 - 17: 7
 - 18: 1
 - 19: 7
 - 20: 1
 - 21: 7
 - 22: 1
 - 23: 7
 - 24: 1
 - 25: 7
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
