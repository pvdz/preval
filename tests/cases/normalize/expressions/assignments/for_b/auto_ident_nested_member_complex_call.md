# Preval test case

# auto_ident_nested_member_complex_call.md

> normalize > expressions > assignments > for_b > auto_ident_nested_member_complex_call
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (; (a = $(b)[$("x")] = $(c)[$("y")] = $(d)); $(1));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
{
  while (true) {
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
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
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
  while (true) {
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
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
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
 - 6: 1
 - 7: { x: '3' }
 - 8: 'x'
 - 9: { y: '3' }
 - 10: 'y'
 - 11: 3
 - 12: 1
 - 13: { x: '3' }
 - 14: 'x'
 - 15: { y: '3' }
 - 16: 'y'
 - 17: 3
 - 18: 1
 - 19: { x: '3' }
 - 20: 'x'
 - 21: { y: '3' }
 - 22: 'y'
 - 23: 3
 - 24: 1
 - 25: { x: '3' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same