# Preval test case

# auto_ident_cond_complex_simple_simple.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_cond_complex_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1) ? 2 : $($(100));
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
  let a;
  {
    const tmpSwitchValue = 1;
    let tmpSwitchVisitDefault = false;
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
        if (tmpSwitchVisitDefault) {
          tmpSwitchFallthrough = true;
        } else {
          {
            let tmpIfTest$1 = tmpSwitchFallthrough;
            if (tmpIfTest$1) {
            } else {
              tmpIfTest$1 = 1 === tmpSwitchValue;
            }
            if (tmpIfTest$1) {
              {
                a = undefined;
                const tmpIfTest$2 = $(1);
                if (tmpIfTest$2) {
                  a = 2;
                } else {
                  const tmpCallCallee = $;
                  const tmpCalleeParam = $(100);
                  a = tmpCallCallee(tmpCalleeParam);
                }
                $(a);
              }
              tmpSwitchFallthrough = true;
            }
          }
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
        tmpSwitchVisitDefault = true;
      } else {
        break;
      }
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
