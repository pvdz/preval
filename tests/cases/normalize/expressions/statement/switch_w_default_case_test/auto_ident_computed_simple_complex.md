# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > statement > switch_w_default_case_test > auto_ident_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case b[$("c")]:
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = { c: 1 };
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
          const tmpCompObj = b;
          const tmpCompProp = $('c');
          const tmpBinLhs = tmpCompObj[tmpCompProp];
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            break;
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
$(a, b);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b = { c: 1 };
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
      const tmpCompObj = b;
      const tmpCompProp = $('c');
      const tmpBinLhs = tmpCompObj[tmpCompProp];
      tmpIfTest = tmpBinLhs === tmpSwitchValue;
    }
    if (tmpIfTest) {
      break;
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
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
