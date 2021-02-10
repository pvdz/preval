# Preval test case

# auto_ident_opt_method_call_extended.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_opt_method_call_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: { d: { e: $ } } };

    let a = b?.c.d.e(1);
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
  let tmpObjLitVal$1;
  let tmpObjLitVal;
  let b;
  let a;
  let tmpChainRootProp;
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
              tmpObjLitVal$1 = { e: $ };
              tmpObjLitVal = { d: tmpObjLitVal$1 };
              b = { c: tmpObjLitVal };
              a = undefined;
              tmpChainRootProp = b;
              if (tmpChainRootProp) {
                const tmpChainElementObject = tmpChainRootProp.c;
                const tmpChainElementObject$1 = tmpChainElementObject.d;
                const tmpChainElementObject$2 = tmpChainElementObject$1.e;
                const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
                a = tmpChainElementCall;
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
 - 1: 1
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
