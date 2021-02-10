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
{
  let tmpSwitchValue = 6;
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  let tmpDoWhileTest;
  do {
    if (tmpSwitchCheckCases) {
    } else {
      tmpSwitchFallthrough = true;
    }
    if (tmpSwitchFallthrough) {
      tmpSwitchFallthrough = true;
    }
    {
      {
        {
          let tmpIfTest = tmpSwitchFallthrough;
          if (tmpIfTest) {
          } else {
            const tmpBinLhs = $(30);
            tmpIfTest = tmpBinLhs === tmpSwitchValue;
          }
          if (tmpIfTest) {
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
