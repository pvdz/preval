# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > assignments > switch_w_default_case_test > auto_ident_logic_and_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = ($($(1)) && $($(1))) || $($(2))):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
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
          const tmpCallCallee = $;
          const tmpCalleeParam = $(1);
          let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
          if (tmpNestedComplexRhs) {
            const tmpCallCallee$1 = $;
            const tmpCalleeParam$1 = $(1);
            tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
          }
          if (tmpNestedComplexRhs) {
          } else {
            const tmpCallCallee$2 = $;
            const tmpCalleeParam$2 = $(2);
            tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
          }
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
$(a);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
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
      const tmpCallCallee = $;
      const tmpCalleeParam = $(1);
      let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
      if (tmpNestedComplexRhs) {
        const tmpCallCallee$1 = $;
        const tmpCalleeParam$1 = $(1);
        tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
      }
      if (tmpNestedComplexRhs) {
      } else {
        const tmpCallCallee$2 = $;
        const tmpCalleeParam$2 = $(2);
        tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
      }
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
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 'fail1'
 - 7: 'fail2'
 - 8: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
