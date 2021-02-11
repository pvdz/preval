# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > statement > switch_w_default_case_test > auto_ident_cond_complex_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1) ? (40, 50, $(60)) : $($(100)):
    break;
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
          let tmpBinLhs = undefined;
          const tmpIfTest$1 = $(1);
          if (tmpIfTest$1) {
            tmpBinLhs = $(60);
          } else {
            const tmpCallCallee = $;
            const tmpCalleeParam = $(100);
            tmpBinLhs = tmpCallCallee(tmpCalleeParam);
          }
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            break;
          }
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
 - 3: 60
 - 4: 'fail1'
 - 5: 'fail2'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
