# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_nested_member_complex_bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = { y: 2 },
      d = 3,
      e = 4;

    let a = ($(b)[$("x")] = $(c)[$("y")] = d + e);
    $(a, b, c, d, e);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let c;
  let d;
  let e;
  let a;
  {
    const tmpSwitchValue = 1;
    let tmpSwitchVisitDefault = false;
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
        if (tmpSwitchVisitDefault) {
          tmpSwitchFallthrough = true;
        } else {
          {
            let tmpIfTest$1 = tmpSwitchFallthrough;
            if (tmpIfTest$1) {
            } else {
              tmpIfTest$1 = 1 === tmpSwitchValue;
            }
            if (tmpIfTest$1) {
              {
                b = { x: 1 };
                c = { y: 2 };
                d = 3;
                e = 4;
                a = undefined;
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
                a = tmpNestedPropAssignRhs$1;
                $(a, b, c, d, e);
              }
              tmpSwitchFallthrough = true;
            }
          }
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
        tmpSwitchVisitDefault = true;
      } else {
        break;
      }
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 7, { x: '7' }, { y: '7' }, 3, 4
 - 6: 'fail1'
 - 7: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
