# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_opt_call_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($)?.($(1));
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
  let tmpChainRootCall;
  let tmpChainElementCall;
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
              a = undefined;
              tmpChainRootCall = $;
              tmpChainElementCall = tmpChainRootCall($);
              if (tmpChainElementCall) {
                const tmpCallObj = tmpChainElementCall;
                const tmpCallVal = tmpCallObj.call;
                const tmpCalleeParam = tmpChainRootCall;
                const tmpCalleeParam$1 = $(1);
                const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
                a = tmpChainElementCall$1;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
