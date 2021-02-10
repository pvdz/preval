# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > assignments > switch_w_default_case_test > auto_ident_object_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = { x: $(1), y: 2, z: $(3) }):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Normalized

`````js filename=intro
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
          const tmpObjLitVal = $(1);
          const tmpObjLitVal$1 = 2;
          const tmpObjLitVal$2 = $(3);
          const tmpNestedComplexRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
          a = tmpNestedComplexRhs;
          tmpBinLhs = tmpNestedComplexRhs;
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
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
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 'fail1'
 - 5: 'fail2'
 - 6: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
