# Preval test case

# switch.md

> normalize > blocks > switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(2): {
    $(3);
  }
  break;
}
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
{
  const tmpSwitchTest = $(1);
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        tmpBinaryRight = $(2);
        ifTestTmp = tmpSwitchTest === tmpBinaryRight;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          {
            $(3);
          }
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
`````

## Uniformed

`````js filename=intro
var x;
{
  var x = x(8);
  x: {
    var x = x;
    {
      var x = x;
      if (x) {
      } else {
        x = x(8);
        x = x * x;
      }
      if (x) {
        ('str');
        {
          {
            x(8);
          }
          break x;
        }
        x = x;
      }
    }
  }
}
`````

## Output

`````js filename=intro
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryRight = $(2);
      ifTestTmp = tmpSwitchTest === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        {
          $(3);
        }
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
`````
