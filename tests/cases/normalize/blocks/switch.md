# Preval test case

# switch.md

> normalize > blocks > switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(2): $(3);
  case $(4):
  case $(5):
  case $(6): break;
  case $(7):
  default:
}
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpBinaryRight_1;
var tmpBinaryRight_2;
var tmpBinaryRight_3;
var tmpBinaryRight_4;
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
          $(3);
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_1 = tmpFallthrough;
      if (ifTestTmp_1) {
      } else {
        tmpBinaryRight_1 = $(4);
        ifTestTmp_1 = tmpSwitchTest === tmpBinaryRight_1;
      }
      if (ifTestTmp_1) {
        ('case 1:');
        {
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_2 = tmpFallthrough;
      if (ifTestTmp_2) {
      } else {
        tmpBinaryRight_2 = $(5);
        ifTestTmp_2 = tmpSwitchTest === tmpBinaryRight_2;
      }
      if (ifTestTmp_2) {
        ('case 2:');
        {
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_3 = tmpFallthrough;
      if (ifTestTmp_3) {
      } else {
        tmpBinaryRight_3 = $(6);
        ifTestTmp_3 = tmpSwitchTest === tmpBinaryRight_3;
      }
      if (ifTestTmp_3) {
        ('case 3:');
        {
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp_4 = tmpFallthrough;
      if (ifTestTmp_4) {
      } else {
        tmpBinaryRight_4 = $(7);
        ifTestTmp_4 = tmpSwitchTest === tmpBinaryRight_4;
      }
      if (ifTestTmp_4) {
        ('case 4:');
        {
        }
        tmpFallthrough = true;
      }
    }
    {
      ('default case:');
    }
  }
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
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
          x(8);
        }
        x = x;
      }
    }
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
        }
        x = x;
      }
    }
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
        }
        x = x;
      }
    }
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
          break x;
        }
        x = x;
      }
    }
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
        }
        x = x;
      }
    }
    {
      ('str');
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
        $(3);
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = tmpFallthrough;
    if (ifTestTmp_1) {
    } else {
      tmpBinaryRight_1 = $(4);
      ifTestTmp_1 = tmpSwitchTest === tmpBinaryRight_1;
    }
    if (ifTestTmp_1) {
      ('case 1:');
      {
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_2 = tmpFallthrough;
    if (ifTestTmp_2) {
    } else {
      tmpBinaryRight_2 = $(5);
      ifTestTmp_2 = tmpSwitchTest === tmpBinaryRight_2;
    }
    if (ifTestTmp_2) {
      ('case 2:');
      {
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_3 = tmpFallthrough;
    if (ifTestTmp_3) {
    } else {
      tmpBinaryRight_3 = $(6);
      ifTestTmp_3 = tmpSwitchTest === tmpBinaryRight_3;
    }
    if (ifTestTmp_3) {
      ('case 3:');
      {
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_4 = tmpFallthrough;
    if (ifTestTmp_4) {
    } else {
      tmpBinaryRight_4 = $(7);
      ifTestTmp_4 = tmpSwitchTest === tmpBinaryRight_4;
    }
    if (ifTestTmp_4) {
      ('case 4:');
      {
      }
      tmpFallthrough = true;
    }
  }
  {
    ('default case:');
  }
}
`````
