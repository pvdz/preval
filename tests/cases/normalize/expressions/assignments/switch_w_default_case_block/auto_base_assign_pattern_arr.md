# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > assignments > switch_w_default_case_block > auto_base_assign_pattern_arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = [b] = $([$(2)]);
  }
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
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
            const tmpBinLhs = $(1);
            tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
          }
          if (tmpIfTest$1) {
            {
              {
                const tmpCallCallee = $;
                const tmpArrElement = $(2);
                const tmpCalleeParam = [tmpArrElement];
                const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
                const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
                b = arrPatternSplat[0];
                a = tmpNestedAssignArrPatternRhs;
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
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: [2]
 - 5: 'fail1'
 - 6: 'fail2'
 - 7: [2], 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
