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
var tmpDoWhileTest;
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
            const tmpBinLhs = $(30);
            tmpIfTest = tmpBinLhs === tmpSwitchValue;
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
    tmpDoWhileTest = tmpSwitchFallthrough === false;
  } while (tmpDoWhileTest);
}
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
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
    const tmpBinLhs = $(30);
    tmpIfTest = tmpBinLhs === 6;
  }
  if (tmpIfTest) {
    tmpSwitchFallthrough = true;
  }
  tmpSwitchCheckCases = false;
  tmpDoWhileTest = tmpSwitchFallthrough === false;
} while (tmpDoWhileTest);
`````

## Result

Should call `$` with:
 - 1: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
