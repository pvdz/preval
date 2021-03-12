# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Statement > Do while > Auto ident nested complex member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (
  ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(
    b
  )[$("x")] = c)
);
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag || ($(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = $(b)[$('x')] = c)) {
    tmpDoWhileFlag = false;
    {
      $(100);
    }
  }
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
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
    tmpIfTest = tmpNestedPropAssignRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
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
    varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
    varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
    varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
    tmpIfTest = 3;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
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
 - 14: 100
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
