# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = (10, 20, 30) ? (40, 50, 60) : $($(100));
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
    let tmpSwitchValue = 1;
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
              tmpIfTest$1 = 1 === tmpSwitchValue;
            }
            if (tmpIfTest$1) {
              {
                a = undefined;
                const tmpIfTest$2 = 30;
                if (tmpIfTest$2) {
                  a = 60;
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
 - 1: 60
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
