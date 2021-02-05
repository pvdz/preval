# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > statement > switch_w_default_case_test > auto_ident_nested_complex_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
    $("x")
  ] = $(b)[$("x")] = c):
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpSwitchValue = tmpSwitchTest;
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  do {
    if (tmpSwitchCheckCases) {
      ('Cases before the default case');
      {
        ('case 0');
        let tmpIfTest = tmpSwitchFallthrough;
        if (tmpIfTest) {
        } else {
          let tmpBinLhs;
          const tmpNestedAssignComMemberObj = $(b);
          const tmpNestedAssignComMemberProp = $('x');
          let tmpNestedAssignPropRhs;
          const tmpNestedAssignComMemberObj$1 = $(b);
          const tmpNestedAssignComMemberProp$1 = $('x');
          let tmpNestedAssignPropRhs$1;
          const tmpNestedAssignComMemberObj$2 = $(b);
          const tmpNestedAssignComMemberProp$2 = $('x');
          let tmpNestedAssignPropRhs$2;
          const tmpNestedAssignComMemberObj$3 = $(b);
          const tmpNestedAssignComMemberProp$3 = $('x');
          let tmpNestedAssignPropRhs$3;
          const tmpNestedAssignComMemberObj$4 = $(b);
          const tmpNestedAssignComMemberProp$4 = $('x');
          let tmpNestedAssignPropRhs$4;
          const tmpNestedAssignComMemberObj$5 = $(b);
          const tmpNestedAssignComMemberProp$5 = $('x');
          const tmpNestedPropAssignRhs = c;
          tmpNestedAssignComMemberObj$5[tmpNestedAssignComMemberProp$5] = tmpNestedPropAssignRhs;
          tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
          const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
          tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = tmpNestedPropAssignRhs$1;
          tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
          const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
          tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$2;
          tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
          const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
          tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$3;
          tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
          const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
          tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$4;
          tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
          const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
          tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$5;
          tmpBinLhs = tmpNestedPropAssignRhs$5;
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            break;
          }
          tmpSwitchFallthrough = true;
        }
      }
    } else {
      tmpSwitchFallthrough = true;
    }
    if (tmpSwitchFallthrough) {
      ('the default case');
      {
        $('fail1');
      }
      tmpSwitchFallthrough = true;
    }
    {
      {
        ('cases after the default case');
        {
          ('case 0');
          let tmpIfTest$1 = tmpSwitchFallthrough;
          if (tmpIfTest$1) {
          } else {
            tmpIfTest$1 = 2 === tmpSwitchValue;
          }
          if (tmpIfTest$1) {
            {
              $('fail2');
            }
            tmpSwitchFallthrough = true;
          }
        }
      }
    }
    tmpSwitchCheckCases = false;
    tmpDoWhileTest = tmpSwitchFallthrough === false;
  } while (tmpDoWhileTest);
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCheckCases = true;
let tmpSwitchFallthrough = false;
do {
  if (tmpSwitchCheckCases) {
    let tmpIfTest = tmpSwitchFallthrough;
    if (tmpIfTest) {
    } else {
      let tmpBinLhs;
      const tmpNestedAssignComMemberObj = $(b);
      const tmpNestedAssignComMemberProp = $('x');
      let tmpNestedAssignPropRhs;
      const tmpNestedAssignComMemberObj$1 = $(b);
      const tmpNestedAssignComMemberProp$1 = $('x');
      let tmpNestedAssignPropRhs$1;
      const tmpNestedAssignComMemberObj$2 = $(b);
      const tmpNestedAssignComMemberProp$2 = $('x');
      let tmpNestedAssignPropRhs$2;
      const tmpNestedAssignComMemberObj$3 = $(b);
      const tmpNestedAssignComMemberProp$3 = $('x');
      let tmpNestedAssignPropRhs$3;
      const tmpNestedAssignComMemberObj$4 = $(b);
      const tmpNestedAssignComMemberProp$4 = $('x');
      let tmpNestedAssignPropRhs$4;
      const tmpNestedAssignComMemberObj$5 = $(b);
      const tmpNestedAssignComMemberProp$5 = $('x');
      tmpNestedAssignComMemberObj$5[tmpNestedAssignComMemberProp$5] = 3;
      tmpNestedAssignPropRhs$4 = 3;
      const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
      tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = tmpNestedPropAssignRhs$1;
      tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
      const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
      tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$2;
      tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
      const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
      tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$3;
      tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
      const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$4;
      tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
      const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$5;
      tmpBinLhs = tmpNestedPropAssignRhs$5;
      tmpIfTest = tmpBinLhs === tmpSwitchValue;
    }
    if (tmpIfTest) {
      break;
      tmpSwitchFallthrough = true;
    }
  } else {
    tmpSwitchFallthrough = true;
  }
  if (tmpSwitchFallthrough) {
    $('fail1');
    tmpSwitchFallthrough = true;
  }
  let tmpIfTest$1 = tmpSwitchFallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpIfTest$1 = 2 === tmpSwitchValue;
  }
  if (tmpIfTest$1) {
    $('fail2');
    tmpSwitchFallthrough = true;
  }
  tmpSwitchCheckCases = false;
  tmpDoWhileTest = tmpSwitchFallthrough === false;
} while (tmpDoWhileTest);
$(a, b, 3);
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
 - 14: 'fail1'
 - 15: 'fail2'
 - 16: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
