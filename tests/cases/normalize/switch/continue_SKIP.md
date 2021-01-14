# Preval test case

# continue_SKIP.md

> normalize > switch > continue_SKIP
>
> If a switch with non-last-default case gets transformed to a loop then continue statements inside a switch no longer work as they did before...

Need to make sure the `continue` statements in the input still jump to the correct loop. So the loop has to get a label and the continues have to refer to that label.

If the loop already has a label, then that label ought to be used instead since labels cannot nest in this context.

#TODO

## Input

`````js filename=intro
let run = true;
while (run) {
  $(1);
  switch (1) {
    case 1:
      run = false;
      break;
    default:
      continue;
    case 2:
      run = false;
      break;
  }
}
`````

## Normalized

`````js filename=intro
var ifTestTmp;
let run = true;
while (run) {
  $(1);
  {
    let tmpSwitchValue = 1;
    let tmpSwitchCheckCases = true;
    let tmpSwitchFallthrough = false;
    do {
      if (tmpSwitchCheckCases) {
        ('Cases before the default case');
        {
          ('case 0');
          {
            let ifTestTmp_1 = tmpSwitchFallthrough;
            if (ifTestTmp_1) {
            } else {
              ifTestTmp_1 = 1 === tmpSwitchValue;
            }
            if (ifTestTmp_1) {
              {
                run = false;
                break;
              }
              tmpSwitchFallthrough = true;
            }
          }
        }
      } else {
        tmpSwitchFallthrough = true;
      }
      if (tmpSwitchFallthrough) {
        ('the default case');
        {
          continue;
        }
        tmpSwitchFallthrough = true;
      }
      {
        {
          ('cases after the default case');
          {
            ('case 0');
            {
              let ifTestTmp_2 = tmpSwitchFallthrough;
              if (ifTestTmp_2) {
              } else {
                ifTestTmp_2 = 2 === tmpSwitchValue;
              }
              if (ifTestTmp_2) {
                {
                  run = false;
                  break;
                }
                tmpSwitchFallthrough = true;
              }
            }
          }
        }
      }
      tmpSwitchCheckCases = true;
      ifTestTmp = tmpSwitchFallthrough === false;
    } while (ifTestTmp);
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x = true;
while (x) {
  x(8);
  {
    var x = 8;
    var x = x;
    var x = x;
    do {
      if (x) {
        ('str');
        {
          ('str');
          {
            var x = x;
            if (x) {
            } else {
              x = 8 * x;
            }
            if (x) {
              {
                x = false;
                break;
              }
              x = x;
            }
          }
        }
      } else {
        x = x;
      }
      if (x) {
        ('str');
        {
          continue;
        }
        x = x;
      }
      {
        {
          ('str');
          {
            ('str');
            {
              var x = x;
              if (x) {
              } else {
                x = 8 * x;
              }
              if (x) {
                {
                  x = false;
                  break;
                }
                x = x;
              }
            }
          }
        }
      }
      x = x;
      x = x * x;
    } while (x);
  }
}
`````

## Output

`````js filename=intro
var ifTestTmp;
let run = true;
while (run) {
  $(1);
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  do {
    if (tmpSwitchCheckCases) {
      let ifTestTmp_1 = tmpSwitchFallthrough;
      if (ifTestTmp_1) {
      } else {
        ifTestTmp_1 = true;
      }
      if (ifTestTmp_1) {
        run = false;
        break;
        tmpSwitchFallthrough = true;
      }
    } else {
      tmpSwitchFallthrough = true;
    }
    if (tmpSwitchFallthrough) {
      continue;
      tmpSwitchFallthrough = true;
    }
    let ifTestTmp_2 = tmpSwitchFallthrough;
    if (ifTestTmp_2) {
    } else {
      ifTestTmp_2 = true;
    }
    if (ifTestTmp_2) {
      run = false;
      break;
      tmpSwitchFallthrough = true;
    }
    tmpSwitchCheckCases = true;
    ifTestTmp = tmpSwitchFallthrough === false;
  } while (ifTestTmp);
}
`````
