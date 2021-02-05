# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > assignments > switch_w_default_case_top > auto_ident_arr_pattern_assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = [x, y] = [$(3), $(4)];
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let x = 1;
let y = 2;
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
          const tmpBinLhs = $(1);
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            const tmpArrElement = $(3);
            const tmpArrElement$1 = $(4);
            const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
            const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
            x = arrPatternSplat[0];
            y = arrPatternSplat[1];
            a = tmpNestedAssignArrPatternRhs;
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
$(a, x, y);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let x = 1;
let y = 2;
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
      const tmpBinLhs = $(1);
      tmpIfTest = tmpBinLhs === tmpSwitchValue;
    }
    if (tmpIfTest) {
      const tmpArrElement = $(3);
      const tmpArrElement$1 = $(4);
      const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
      const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
      x = arrPatternSplat[0];
      y = arrPatternSplat[1];
      a = tmpNestedAssignArrPatternRhs;
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
$(a, x, y);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 4
 - 5: 'fail1'
 - 6: 'fail2'
 - 7: [3, 4], 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
