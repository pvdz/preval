# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> normalize > expressions > assignments > switch_w_default_case_test > auto_ident_cond_c-seq_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))):
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
      ('Cases before the default case');
      {
        ('case 0');
        let tmpIfTest = tmpSwitchFallthrough;
        if (tmpIfTest) {
        } else {
          let tmpBinLhs;
          let tmpNestedComplexRhs = undefined;
          10;
          20;
          const tmpIfTest$1 = $(30);
          if (tmpIfTest$1) {
            40;
            50;
            tmpNestedComplexRhs = 60;
          } else {
            const tmpCallCallee = $;
            const tmpCalleeParam = $(100);
            tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
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
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCheckCases = true;
let tmpSwitchFallthrough = false;
let tmpDoWhileTest;
do {
  if (tmpSwitchCheckCases) {
    let tmpIfTest = tmpSwitchFallthrough;
    if (tmpIfTest) {
    } else {
      let tmpBinLhs;
      let tmpNestedComplexRhs = undefined;
      const tmpIfTest$1 = $(30);
      if (tmpIfTest$1) {
        tmpNestedComplexRhs = 60;
      } else {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(100);
        tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
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
 - 2: 30
 - 3: 'fail1'
 - 4: 'fail2'
 - 5: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
