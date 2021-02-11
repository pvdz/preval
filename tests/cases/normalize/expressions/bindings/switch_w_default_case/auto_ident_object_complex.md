# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_object_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = { x: $(1), y: 2, z: $(3) };
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
  let tmpObjLitVal;
  let tmpObjLitVal$1;
  let tmpObjLitVal$2;
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
                tmpObjLitVal = $(1);
                tmpObjLitVal$1 = 2;
                tmpObjLitVal$2 = $(3);
                a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
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
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
