# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > assignments > switch_w_default_case_test > auto_ident_nested_member_complex_bin
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
switch ($(1)) {
  case (a = $(b)[$("x")] = $(c)[$("y")] = d + e):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpSwitchValue = tmpSwitchTest;
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  let tmpDoWhileFlag = true;
  while (true) {
    let tmpIfTest = tmpDoWhileFlag;
    if (tmpIfTest) {
    } else {
      tmpIfTest = tmpSwitchFallthrough === false;
    }
    if (tmpIfTest) {
      tmpDoWhileFlag = false;
      if (tmpSwitchCheckCases) {
        {
          let tmpIfTest$1 = tmpSwitchFallthrough;
          if (tmpIfTest$1) {
          } else {
            let tmpBinLhs;
            let tmpNestedComplexRhs;
            const tmpNestedAssignComMemberObj = $(b);
            const tmpNestedAssignComMemberProp = $('x');
            let tmpNestedAssignPropRhs;
            const tmpNestedAssignComMemberObj$1 = $(c);
            const tmpNestedAssignComMemberProp$1 = $('y');
            let tmpNestedAssignPropRhs$1 = d + e;
            const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
            tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
            tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
            const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
            tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
            tmpNestedComplexRhs = tmpNestedPropAssignRhs$1;
            a = tmpNestedComplexRhs;
            tmpBinLhs = tmpNestedComplexRhs;
            tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
          }
          if (tmpIfTest$1) {
            tmpSwitchFallthrough = true;
          }
        }
      } else {
        tmpSwitchFallthrough = true;
      }
      if (tmpSwitchFallthrough) {
        {
          $('fail1');
        }
        tmpSwitchFallthrough = true;
      }
      {
        {
          {
            let tmpIfTest$2 = tmpSwitchFallthrough;
            if (tmpIfTest$2) {
            } else {
              tmpIfTest$2 = 2 === tmpSwitchValue;
            }
            if (tmpIfTest$2) {
              {
                $('fail2');
              }
              tmpSwitchFallthrough = true;
            }
          }
        }
      }
      tmpSwitchCheckCases = false;
    } else {
      break;
    }
  }
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 'fail1'
 - 7: 'fail2'
 - 8: 7, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
