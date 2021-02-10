# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > switch_w_default_case_block > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      $($(0)) || ($($(1)) && $($(2)));
    }
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
          const tmpBinLhs = $(1);
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            {
              const tmpCallCallee = $;
              const tmpCalleeParam = $(0);
              const tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
              if (tmpIfTest$1) {
              } else {
                const tmpCallCallee$1 = $;
                const tmpCalleeParam$1 = $(1);
                const tmpIfTest$2 = tmpCallCallee$1(tmpCalleeParam$1);
                if (tmpIfTest$2) {
                  const tmpCallCallee$2 = $;
                  const tmpCalleeParam$2 = $(2);
                  tmpCallCallee$2(tmpCalleeParam$2);
                }
              }
            }
            break;
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
          let tmpIfTest$3 = tmpSwitchFallthrough;
          if (tmpIfTest$3) {
          } else {
            tmpIfTest$3 = 2 === tmpSwitchValue;
          }
          if (tmpIfTest$3) {
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
 - 3: 0
 - 4: 0
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
