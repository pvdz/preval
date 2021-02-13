# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > assignments > for_c > auto_ident_nested_complex_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (
  ;
  $(1);
  a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
    $("x")
  ] = $(b)[$("x")] = c
);
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
      const tmpNestedAssignComMemberObj = $(b);
      const tmpNestedAssignComMemberProp = $('x');
      const varInitAssignLhsComputedObj = $(b);
      const varInitAssignLhsComputedProp = $('x');
      const varInitAssignLhsComputedObj$1 = $(b);
      const varInitAssignLhsComputedProp$1 = $('x');
      const varInitAssignLhsComputedObj$2 = $(b);
      const varInitAssignLhsComputedProp$2 = $('x');
      const varInitAssignLhsComputedObj$3 = $(b);
      const varInitAssignLhsComputedProp$3 = $('x');
      const varInitAssignLhsComputedObj$4 = $(b);
      const varInitAssignLhsComputedProp$4 = $('x');
      const varInitAssignLhsComputedRhs$4 = c;
      varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$4;
      const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
      const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
      varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
      const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
      const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
      const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
      a = tmpNestedPropAssignRhs;
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
let c = 3;
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpNestedAssignComMemberObj = $(b);
      const tmpNestedAssignComMemberProp = $('x');
      const varInitAssignLhsComputedObj = $(b);
      const varInitAssignLhsComputedProp = $('x');
      const varInitAssignLhsComputedObj$1 = $(b);
      const varInitAssignLhsComputedProp$1 = $('x');
      const varInitAssignLhsComputedObj$2 = $(b);
      const varInitAssignLhsComputedProp$2 = $('x');
      const varInitAssignLhsComputedObj$3 = $(b);
      const varInitAssignLhsComputedProp$3 = $('x');
      const varInitAssignLhsComputedObj$4 = $(b);
      const varInitAssignLhsComputedProp$4 = $('x');
      const varInitAssignLhsComputedRhs$4 = c;
      varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$4;
      varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$4;
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs$4;
      a = varInitAssignLhsComputedRhs$4;
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { x: '1' }
 - 5: 'x'
 - 6: { x: '1' }
 - 7: 'x'
 - 8: { x: '1' }
 - 9: 'x'
 - 10: { x: '1' }
 - 11: 'x'
 - 12: { x: '1' }
 - 13: 'x'
 - 14: 1
 - 15: { x: '3' }
 - 16: 'x'
 - 17: { x: '3' }
 - 18: 'x'
 - 19: { x: '3' }
 - 20: 'x'
 - 21: { x: '3' }
 - 22: 'x'
 - 23: { x: '3' }
 - 24: 'x'
 - 25: { x: '3' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
