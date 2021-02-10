# Preval test case

# auto_ident_nested_member_complex_call.md

> normalize > expressions > assignments > switch_w_default_case_block > auto_ident_nested_member_complex_call
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $(b)[$("x")] = $(c)[$("y")] = $(d);
  }
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpSwitchValue = tmpSwitchTest;
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  let tmpDoWhileTest;
  do {
    if (tmpSwitchCheckCases) {
      {
        let tmpIfTest = tmpSwitchFallthrough;
        if (tmpIfTest) {
        } else {
          const tmpBinLhs = $(1);
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            {
              const tmpNestedAssignComMemberObj = $(b);
              const tmpNestedAssignComMemberProp = $('x');
              let tmpNestedAssignPropRhs;
              const tmpNestedAssignComMemberObj$1 = $(c);
              const tmpNestedAssignComMemberProp$1 = $('y');
              let tmpNestedAssignPropRhs$1 = $(d);
              const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
              tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
              tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
              const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
              tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
              a = tmpNestedPropAssignRhs$1;
            }
          }
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
$(a, b, c, d);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { y: '2' }
 - 6: 'y'
 - 7: 3
 - 8: 'fail1'
 - 9: 'fail2'
 - 10: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
