# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > assignments > switch_w_default_case_test > auto_ident_arr_pattern_assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = [x, y] = [$(3), $(4)]):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  const tmpSwitchValue = tmpSwitchTest;
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
            let tmpBinLhs;
            let tmpNestedComplexRhs;
            const tmpArrElement = $(3);
            const tmpArrElement$1 = $(4);
            const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
            const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
            x = arrPatternSplat[0];
            y = arrPatternSplat[1];
            tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
            a = tmpNestedComplexRhs;
            tmpBinLhs = tmpNestedComplexRhs;
            tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
          }
          if (tmpIfTest$1) {
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
$(a, x, y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 4
 - 4: 'fail1'
 - 5: 'fail2'
 - 6: [3, 4], 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
