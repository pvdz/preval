# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

#TODO

## Input

`````js filename=intro
switch (6) {
  default: 
  case $(30): ;
}
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpBinaryLeft;
{
  let tmpSwitchValue = 6;
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  do {
    if (tmpSwitchCheckCases) {
      ('Cases before the default case');
    } else {
      tmpSwitchFallthrough = true;
    }
    if (tmpSwitchFallthrough) {
      ('the default case');
      {
      }
      tmpSwitchFallthrough = true;
    }
    {
      {
        ('cases after the default case');
        {
          ('case 0');
          let tmpIfTest = tmpSwitchFallthrough;
          if (tmpIfTest) {
          } else {
            tmpBinaryLeft = $(30);
            tmpIfTest = tmpBinaryLeft === tmpSwitchValue;
          }
          if (tmpIfTest) {
            {
            }
            tmpSwitchFallthrough = true;
          }
        }
      }
    }
    tmpSwitchCheckCases = false;
    ifTestTmp = tmpSwitchFallthrough === false;
  } while (ifTestTmp);
}
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpBinaryLeft;
let tmpSwitchCheckCases = true;
let tmpSwitchFallthrough = false;
do {
  if (tmpSwitchCheckCases) {
  } else {
    tmpSwitchFallthrough = true;
  }
  if (tmpSwitchFallthrough) {
    tmpSwitchFallthrough = true;
  }
  let tmpIfTest = tmpSwitchFallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = $(30);
    tmpIfTest = tmpBinaryLeft === 6;
  }
  if (tmpIfTest) {
    tmpSwitchFallthrough = true;
  }
  tmpSwitchCheckCases = false;
  ifTestTmp = tmpSwitchFallthrough === false;
} while (ifTestTmp);
`````

## Result

Should call `$` with:
 - 0: 30
 - 1: undefined

Normalized calls: Same

Final output calls: Same
