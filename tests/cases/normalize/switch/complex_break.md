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
    $(4);
    break;
  }
  case 'no': break;
}
`````

`````js filename=into
let fall = false;
if (1 === 1) {
  if (2) {
    $(3);
    fall = false;
  } else {
    $(4);
    fall = false;
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
          $(4);
          break tmpSwitchBreak;
        }
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp$1 = tmpFallthrough;
    if (ifTestTmp$1) {
    } else {
      ifTestTmp$1 = 1 === 'no';
    }
    if (ifTestTmp$1) {
      ('case 1:');
      {
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
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
          $(4);
          break tmpSwitchBreak;
        }
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp$1 = tmpFallthrough;
    if (ifTestTmp$1) {
    } else {
      ifTestTmp$1 = 1 === 'no';
    }
    if (ifTestTmp$1) {
      ('case 1:');
      {
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
