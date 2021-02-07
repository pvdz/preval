# Preval test case

# auto_ident_opt_extended.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_opt_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: { z: 100 } } };

    let a = b?.x.y.z;
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
              tmpObjLitVal$1 = { z: 100 };
              tmpObjLitVal = { y: tmpObjLitVal$1 };
              b = { x: tmpObjLitVal };
              a = undefined;
              tmpChainRootProp = b;
              if (tmpChainRootProp) {
                const tmpChainElementObject = tmpChainRootProp.x;
                const tmpChainElementObject$1 = tmpChainElementObject.y;
                const tmpChainElementObject$2 = tmpChainElementObject$1.z;
                a = tmpChainElementObject$2;
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
let tmpObjLitVal$1;
let tmpObjLitVal;
let b;
let a;
let tmpChainRootProp;
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
      tmpObjLitVal$1 = { z: 100 };
      tmpObjLitVal = { y: tmpObjLitVal$1 };
      b = { x: tmpObjLitVal };
      a = undefined;
      tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.x;
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        const tmpChainElementObject$2 = tmpChainElementObject$1.z;
        a = tmpChainElementObject$2;
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
 - 1: 100
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
