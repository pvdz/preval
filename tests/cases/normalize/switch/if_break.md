# Preval test case

# if-break.md

> normalize > switch > if-break
>
> Breaks don't need to be toplevel to a case...

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1: {
    if (2) {
      $(3);
      break;
    }
  }
  case 4: {
    if (5) {
      $(6);
      break;
    }
  }
}
`````

## Normalized

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      ifTestTmp = 1 === 1;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        {
          if (2) {
            $(3);
            break tmpSwitchBreak;
          }
        }
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = tmpFallthrough;
    if (ifTestTmp_1) {
    } else {
      ifTestTmp_1 = 1 === 4;
    }
    if (ifTestTmp_1) {
      ('case 1:');
      {
        {
          if (5) {
            $(6);
            break tmpSwitchBreak;
          }
        }
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Uniformed

`````js filename=intro
x: {
  var x = x;
  {
    var x = x;
    if (x) {
    } else {
      x = 8 * 8;
    }
    if (x) {
      ('str');
      {
        {
          if (8) {
            x(8);
            break x;
          }
        }
      }
      x = x;
    }
  }
  {
    var x = x;
    if (x) {
    } else {
      x = 8 * 8;
    }
    if (x) {
      ('str');
      {
        {
          if (8) {
            x(8);
            break x;
          }
        }
      }
      x = x;
    }
  }
}
`````

## Output

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      ifTestTmp = 1 === 1;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        {
          if (2) {
            $(3);
            break tmpSwitchBreak;
          }
        }
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = tmpFallthrough;
    if (ifTestTmp_1) {
    } else {
      ifTestTmp_1 = 1 === 4;
    }
    if (ifTestTmp_1) {
      ('case 1:');
      {
        {
          if (5) {
            $(6);
            break tmpSwitchBreak;
          }
        }
      }
      tmpFallthrough = true;
    }
  }
}
`````
