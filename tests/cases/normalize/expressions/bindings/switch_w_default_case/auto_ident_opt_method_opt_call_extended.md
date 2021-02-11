# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_opt_method_opt_call_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: { d: { e: $ } } };

    let a = b?.c.d.e?.(1);
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
                tmpObjLitVal$1 = { e: $ };
                tmpObjLitVal = { d: tmpObjLitVal$1 };
                b = { c: tmpObjLitVal };
                a = undefined;
                tmpChainRootProp = b;
                if (tmpChainRootProp) {
                  const tmpChainElementObject = tmpChainRootProp.c;
                  const tmpChainElementObject$1 = tmpChainElementObject.d;
                  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
                  if (tmpChainElementObject$2) {
                    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
                    a = tmpChainElementCall;
                  }
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
 - 1: 1
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
