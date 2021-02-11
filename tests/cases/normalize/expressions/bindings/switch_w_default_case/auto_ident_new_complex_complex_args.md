# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_new_complex_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new ($($))($(1), $(2));
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
  let b;
  let tmpNewCallee;
  let tmpCalleeParam;
  let tmpCalleeParam$1;
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
                b = { $: $ };
                tmpNewCallee = $($);
                tmpCalleeParam = $(1);
                tmpCalleeParam$1 = $(2);
                a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: {}
 - 6: 'fail1'
 - 7: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
