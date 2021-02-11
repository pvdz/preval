# Preval test case

# auto_ident_opt_method_call_simple.md

> normalize > expressions > assignments > switch_w_default_case_test > auto_ident_opt_method_call_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b?.c(1)):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
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
            let tmpNestedComplexRhs = undefined;
            const tmpChainRootProp = b;
            if (tmpChainRootProp) {
              const tmpChainElementObject = tmpChainRootProp.c;
              const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
              tmpNestedComplexRhs = tmpChainElementCall;
            }
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
 - 3: 'fail1'
 - 4: 'fail2'
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
