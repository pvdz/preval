# Preval test case

# auto_ident_call_complex_complex_args.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_call_complex_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $($)($(1), $(2));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
{
  let b;
  let a;
  {
    let tmpSwitchValue = 1;
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
            tmpIfTest = 1 === tmpSwitchValue;
          }
          if (tmpIfTest) {
            {
              b = { $: $ };
              const tmpCallCallee = $($);
              const tmpCalleeParam = $(1);
              const tmpCalleeParam$1 = $(2);
              a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
              $(a);
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
}
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b;
let a;
let tmpSwitchCheckCases = true;
let tmpSwitchFallthrough = false;
do {
  if (tmpSwitchCheckCases) {
    let tmpIfTest = tmpSwitchFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = true;
    }
    if (tmpIfTest) {
      b = { $: $ };
      const tmpCallCallee = $($);
      const tmpCalleeParam = $(1);
      const tmpCalleeParam$1 = $(2);
      a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: 'fail1'
 - 7: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
