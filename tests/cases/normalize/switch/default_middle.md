# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

The problem at hand is that default is allowed to jump back.

The input below should call $ with 10, 20, 30, 40, 50, and then 'd', 3, and 4. 

More complex cases are possible, where breaks happen at arbitrary points rather than top level. Send help.

I think it's "okay" to take the remaining cases and duplicate their consequent statements as the body of the default. Best case that's an empty list when the default is the last case, worst case it makes the rare situation where this occurs anyways, work in a less efficient way. At least it should still work... But some problems may arise, I dunno.

```js
let x = 6;
let def = false
let fall = false;
// Either a case breaks explicitly, in which case the test is moot
// Or, a case falls through and never breaks, then the test halts
// Or, the default is hit, which will always set fall, so the test halts
while(fall === false) {
  if (def) {
    // The default case only has a `fall` check
    // That's because the case that preceeds it may fall through to it
    fall = true;
  } else {
    // These are the cases that preceded the default case
    if (x === $(10)) {
      $(1);
      break;
    }
    if (fall || x === $(20)) {
      $(1);
      fall = true; // this one will fall through to the default case
    }
  }
  if (fall) { // default case, no other condition
    $('d');
    fall = true;
  }
  if (fall || x === $(40)) {
    $(4);
    fall = true;
  }
  if (fall || x === $(50)) {
    $(5);
    break;
  }
 
  def = true; // No case was hit so repeat from the top but invoke the default case this time
}
```

#TODO

## Input

`````js filename=intro
switch (6) {
  case $(10): $(1); break;
  case $(20): $(2);
  default: $('d');
  case $(30): $(3);
  case $(40): $(4); break;
  case $(50): $(5); break;
}
`````

## Normalized

`````js filename=intro
{
  let tmpSwitchValue = 6;
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  let tmpDoWhileFlag = true;
  while (true) {
    let tmpIfTest = tmpDoWhileFlag;
    if (tmpIfTest) {
    } else {
      tmpIfTest = tmpSwitchFallthrough === false;
    }
    if (tmpIfTest) {
      tmpDoWhileFlag = false;
      if (tmpSwitchCheckCases) {
        {
          let tmpIfTest$1 = tmpSwitchFallthrough;
          if (tmpIfTest$1) {
          } else {
            const tmpBinLhs = $(10);
            tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
          }
          if (tmpIfTest$1) {
            {
              $(1);
              break;
            }
          }
        }
        {
          let tmpIfTest$2 = tmpSwitchFallthrough;
          if (tmpIfTest$2) {
          } else {
            const tmpBinLhs$1 = $(20);
            tmpIfTest$2 = tmpBinLhs$1 === tmpSwitchValue;
          }
          if (tmpIfTest$2) {
            {
              $(2);
            }
            tmpSwitchFallthrough = true;
          }
        }
      } else {
        tmpSwitchFallthrough = true;
      }
      if (tmpSwitchFallthrough) {
        {
          $('d');
        }
        tmpSwitchFallthrough = true;
      }
      {
        {
          {
            let tmpIfTest$3 = tmpSwitchFallthrough;
            if (tmpIfTest$3) {
            } else {
              const tmpBinLhs$2 = $(30);
              tmpIfTest$3 = tmpBinLhs$2 === tmpSwitchValue;
            }
            if (tmpIfTest$3) {
              {
                $(3);
              }
              tmpSwitchFallthrough = true;
            }
          }
          {
            let tmpIfTest$4 = tmpSwitchFallthrough;
            if (tmpIfTest$4) {
            } else {
              const tmpBinLhs$3 = $(40);
              tmpIfTest$4 = tmpBinLhs$3 === tmpSwitchValue;
            }
            if (tmpIfTest$4) {
              {
                $(4);
                break;
              }
            }
          }
          {
            let tmpIfTest$5 = tmpSwitchFallthrough;
            if (tmpIfTest$5) {
            } else {
              const tmpBinLhs$4 = $(50);
              tmpIfTest$5 = tmpBinLhs$4 === tmpSwitchValue;
            }
            if (tmpIfTest$5) {
              {
                $(5);
                break;
              }
            }
          }
        }
      }
      tmpSwitchCheckCases = false;
    } else {
      break;
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 30
 - 4: 40
 - 5: 50
 - 6: 'd'
 - 7: 3
 - 8: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
