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
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
var tmpBinaryLeft_2;
var tmpBinaryRight_2;
var tmpBinaryLeft_3;
var tmpBinaryRight_3;
var tmpBinaryLeft_4;
var tmpBinaryRight_4;
{
  const tmpSwitchTest = $(1);
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $(2);
        ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
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
        tmpBinaryLeft_1 = tmpSwitchTest;
        tmpBinaryRight_1 = $(4);
        ifTestTmp_1 = tmpBinaryLeft_1 === tmpBinaryRight_1;
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
        tmpBinaryLeft_2 = tmpSwitchTest;
        tmpBinaryRight_2 = $(5);
        ifTestTmp_2 = tmpBinaryLeft_2 === tmpBinaryRight_2;
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
        tmpBinaryLeft_3 = tmpSwitchTest;
        tmpBinaryRight_3 = $(6);
        ifTestTmp_3 = tmpBinaryLeft_3 === tmpBinaryRight_3;
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
        tmpBinaryLeft_4 = tmpSwitchTest;
        tmpBinaryRight_4 = $(7);
        ifTestTmp_4 = tmpBinaryLeft_4 === tmpBinaryRight_4;
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

## Output

`````js filename=intro
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $(2);
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
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
      tmpBinaryLeft_1 = tmpSwitchTest;
      tmpBinaryRight_1 = $(4);
      ifTestTmp_1 = tmpBinaryLeft_1 === tmpBinaryRight_1;
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
      tmpBinaryLeft_2 = tmpSwitchTest;
      tmpBinaryRight_2 = $(5);
      ifTestTmp_2 = tmpBinaryLeft_2 === tmpBinaryRight_2;
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
      tmpBinaryLeft_3 = tmpSwitchTest;
      tmpBinaryRight_3 = $(6);
      ifTestTmp_3 = tmpBinaryLeft_3 === tmpBinaryRight_3;
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
      tmpBinaryLeft_4 = tmpSwitchTest;
      tmpBinaryRight_4 = $(7);
      ifTestTmp_4 = tmpBinaryLeft_4 === tmpBinaryRight_4;
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

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 4
 - 3: 5
 - 4: 6
 - 5: 7
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1], '<crash[ <ref> is not defined ]>'];

