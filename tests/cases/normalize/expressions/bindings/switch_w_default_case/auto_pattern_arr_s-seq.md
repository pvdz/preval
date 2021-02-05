# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > bindings > switch_w_default_case > auto_pattern_arr_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = ($(10), $(20), [1, 2]);
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
              $(10);
              $(20);
              const arrAssignPatternRhs = [1, 2];
              const arrPatternSplat = [...arrAssignPatternRhs];
              a = arrPatternSplat[0];
              arrAssignPatternRhs;
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
      $(10);
      $(20);
      const arrAssignPatternRhs = [1, 2];
      const arrPatternSplat = [...arrAssignPatternRhs];
      a = arrPatternSplat[0];
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
 - 1: 10
 - 2: 20
 - 3: 1
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
