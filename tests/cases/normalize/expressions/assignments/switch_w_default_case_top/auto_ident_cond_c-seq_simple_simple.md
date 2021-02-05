# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> normalize > expressions > assignments > switch_w_default_case_top > auto_ident_cond_c-seq_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = (10, 20, $(30)) ? $(2) : $($(100));
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
          const tmpBinLhs = $(1);
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            10;
            20;
            const tmpIfTest$1 = $(30);
            if (tmpIfTest$1) {
              a = $(2);
            } else {
              const tmpCallCallee = $;
              const tmpCalleeParam = $(100);
              a = tmpCallCallee(tmpCalleeParam);
            }
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
      const tmpBinLhs = $(1);
      tmpIfTest = tmpBinLhs === tmpSwitchValue;
    }
    if (tmpIfTest) {
      const tmpIfTest$1 = $(30);
      if (tmpIfTest$1) {
        a = $(2);
      } else {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(100);
        a = tmpCallCallee(tmpCalleeParam);
      }
      tmpSwitchFallthrough = true;
    }
  } else {
    tmpSwitchFallthrough = true;
  }
  if (tmpSwitchFallthrough) {
    $('fail1');
    tmpSwitchFallthrough = true;
  }
  let tmpIfTest$2 = tmpSwitchFallthrough;
  if (tmpIfTest$2) {
  } else {
    tmpIfTest$2 = 2 === tmpSwitchValue;
  }
  if (tmpIfTest$2) {
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
 - 3: 30
 - 4: 2
 - 5: 'fail1'
 - 6: 'fail2'
 - 7: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
