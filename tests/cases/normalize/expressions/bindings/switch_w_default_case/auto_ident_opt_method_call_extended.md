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
              const tmpObjLitVal$1 = { e: $ };
              const tmpObjLitVal = { d: tmpObjLitVal$1 };
              b = { c: tmpObjLitVal };
              a = undefined;
              const tmpChainRootProp = b;
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
      const tmpObjLitVal$1 = { e: $ };
      const tmpObjLitVal = { d: tmpObjLitVal$1 };
      b = { c: tmpObjLitVal };
      a = undefined;
      const tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.c;
        const tmpChainElementObject$1 = tmpChainElementObject.d;
        const tmpChainElementObject$2 = tmpChainElementObject$1.e;
        const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
        a = tmpChainElementCall;
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
 - 1: 1
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
