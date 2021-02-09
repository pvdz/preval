# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_logic_or_and
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || ($($(1)) && $($(2)));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let a;
  {
    let tmpSwitchValue = 1;
    let tmpSwitchCheckCases = true;
    let tmpSwitchFallthrough = false;
    let tmpDoWhileTest;
    do {
      if (tmpSwitchCheckCases) {
        {
          let tmpIfTest = tmpSwitchFallthrough;
          if (tmpIfTest) {
          } else {
            tmpIfTest = 1 === tmpSwitchValue;
          }
          if (tmpIfTest) {
            {
              tmpCallCallee = $;
              tmpCalleeParam = $(0);
              a = tmpCallCallee(tmpCalleeParam);
              if (a) {
              } else {
                const tmpCallCallee$1 = $;
                const tmpCalleeParam$1 = $(1);
                a = tmpCallCallee$1(tmpCalleeParam$1);
                if (a) {
                  const tmpCallCallee$2 = $;
                  const tmpCalleeParam$2 = $(2);
                  a = tmpCallCallee$2(tmpCalleeParam$2);
                }
              }
              $(a);
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
}
`````

## Output

`````js filename=intro
let tmpCallCallee;
let tmpCalleeParam;
let a;
let tmpSwitchCheckCases = true;
let tmpSwitchFallthrough = false;
let tmpDoWhileTest;
do {
  if (tmpSwitchCheckCases) {
    let tmpIfTest = tmpSwitchFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = true;
    }
    if (tmpIfTest) {
      tmpCallCallee = $;
      tmpCalleeParam = $(0);
      a = tmpCallCallee(tmpCalleeParam);
      if (a) {
      } else {
        const tmpCallCallee$1 = $;
        const tmpCalleeParam$1 = $(1);
        a = tmpCallCallee$1(tmpCalleeParam$1);
        if (a) {
          const tmpCallCallee$2 = $;
          const tmpCalleeParam$2 = $(2);
          a = tmpCallCallee$2(tmpCalleeParam$2);
        }
      }
      $(a);
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
    tmpIfTest$1 = true;
  }
  if (tmpIfTest$1) {
    $('fail2');
    tmpSwitchFallthrough = true;
  }
  tmpSwitchCheckCases = false;
  tmpDoWhileTest = tmpSwitchFallthrough === false;
} while (tmpDoWhileTest);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 'fail1'
 - 9: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
