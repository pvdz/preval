# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > switch_w_default_case_test > auto_ident_nested_simple_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (b.x = b.x = b.x = b.x = b.x = b.x = c):
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
let b = { x: 1 };
let c = 3;
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
          let tmpBinLhs;
          let tmpNestedAssignPropRhs;
          let tmpNestedAssignPropRhs$1;
          let tmpNestedAssignPropRhs$2;
          let tmpNestedAssignPropRhs$3;
          let tmpNestedAssignPropRhs$4;
          const tmpNestedPropAssignRhs = c;
          b.x = tmpNestedPropAssignRhs;
          tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
          const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
          b.x = tmpNestedPropAssignRhs$1;
          tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
          const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
          b.x = tmpNestedPropAssignRhs$2;
          tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
          const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
          b.x = tmpNestedPropAssignRhs$3;
          tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
          const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
          b.x = tmpNestedPropAssignRhs$4;
          tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
          const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
          b.x = tmpNestedPropAssignRhs$5;
          tmpBinLhs = tmpNestedPropAssignRhs$5;
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            break;
          }
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
$(a, b, c);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
