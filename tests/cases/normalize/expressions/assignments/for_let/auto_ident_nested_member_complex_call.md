# Preval test case

# auto_ident_nested_member_complex_call.md

> normalize > expressions > assignments > for_let > auto_ident_nested_member_complex_call
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (let xyz = (a = $(b)[$("x")] = $(c)[$("y")] = $(d)); ; $(1)) $(xyz);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
{
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $('y');
  const varInitAssignLhsComputedRhs = $(d);
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
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
{
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $('y');
  const varInitAssignLhsComputedRhs = $(d);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b, c, d);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: 3
 - 7: 1
 - 8: 3
 - 9: 1
 - 10: 3
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 3
 - 15: 1
 - 16: 3
 - 17: 1
 - 18: 3
 - 19: 1
 - 20: 3
 - 21: 1
 - 22: 3
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
