# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > switch_w_default_case_test > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b = 2):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = 1;
let c = 2;
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
          let tmpBinLhs;
          let tmpNestedComplexRhs;
          b = 2;
          tmpNestedComplexRhs = 2;
          a = tmpNestedComplexRhs;
          tmpBinLhs = tmpNestedComplexRhs;
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
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
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b = 1;
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
      let tmpBinLhs;
      let tmpNestedComplexRhs;
      b = 2;
      tmpNestedComplexRhs = 2;
      a = tmpNestedComplexRhs;
      tmpBinLhs = tmpNestedComplexRhs;
      tmpIfTest = tmpBinLhs === tmpSwitchValue;
    }
    if (tmpIfTest) {
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
$(a, b, 2);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
