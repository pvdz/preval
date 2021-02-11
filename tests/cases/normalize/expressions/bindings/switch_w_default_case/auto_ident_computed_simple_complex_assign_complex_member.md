# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_computed_simple_complex_assign_complex_member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 10, d: 20 };

    let a = (b[$("c")] = $(b)[$("d")]);
    $(a, b);
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
  let a;
  {
    let tmpSwitchValue = 1;
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
              tmpIfTest$1 = 1 === tmpSwitchValue;
            }
            if (tmpIfTest$1) {
              {
                b = { c: 10, d: 20 };
                a = undefined;
                const tmpNestedAssignComMemberObj = b;
                const tmpNestedAssignComMemberProp = $('c');
                const tmpCompObj = $(b);
                const tmpCompProp = $('d');
                let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
                const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
                tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
                a = tmpNestedPropAssignRhs;
                $(a, b);
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
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20, { c: '20', d: '20' }
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
