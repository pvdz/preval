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
var ifTestTmp;
var tmpBinaryLeft;
var tmpBinaryLeft$1;
var tmpBinaryLeft$2;
var tmpBinaryLeft$3;
var tmpBinaryLeft$4;
{
  let tmpSwitchValue = 6;
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  do {
    if (tmpSwitchCheckCases) {
      ('Cases before the default case');
      {
        ('case 0');
        {
          let ifTestTmp$1 = tmpSwitchFallthrough;
          if (ifTestTmp$1) {
          } else {
            tmpBinaryLeft = $(10);
            ifTestTmp$1 = tmpBinaryLeft === tmpSwitchValue;
          }
          if (ifTestTmp$1) {
            {
              $(1);
              break;
            }
            tmpSwitchFallthrough = true;
          }
        }
      }
      {
        ('case 1');
        {
          let ifTestTmp$2 = tmpSwitchFallthrough;
          if (ifTestTmp$2) {
          } else {
            tmpBinaryLeft$1 = $(20);
            ifTestTmp$2 = tmpBinaryLeft$1 === tmpSwitchValue;
          }
          if (ifTestTmp$2) {
            {
              $(2);
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
        $('d');
      }
      tmpSwitchFallthrough = true;
    }
    {
      {
        ('cases after the default case');
        {
          ('case 0');
          {
            let ifTestTmp$3 = tmpSwitchFallthrough;
            if (ifTestTmp$3) {
            } else {
              tmpBinaryLeft$2 = $(30);
              ifTestTmp$3 = tmpBinaryLeft$2 === tmpSwitchValue;
            }
            if (ifTestTmp$3) {
              {
                $(3);
              }
              tmpSwitchFallthrough = true;
            }
          }
        }
        {
          ('case 1');
          {
            let ifTestTmp$4 = tmpSwitchFallthrough;
            if (ifTestTmp$4) {
            } else {
              tmpBinaryLeft$3 = $(40);
              ifTestTmp$4 = tmpBinaryLeft$3 === tmpSwitchValue;
            }
            if (ifTestTmp$4) {
              {
                $(4);
                break;
              }
              tmpSwitchFallthrough = true;
            }
          }
        }
        {
          ('case 2');
          {
            let ifTestTmp$5 = tmpSwitchFallthrough;
            if (ifTestTmp$5) {
            } else {
              tmpBinaryLeft$4 = $(50);
              ifTestTmp$5 = tmpBinaryLeft$4 === tmpSwitchValue;
            }
            if (ifTestTmp$5) {
              {
                $(5);
                break;
              }
              tmpSwitchFallthrough = true;
            }
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
var tmpBinaryLeft$1;
var tmpBinaryLeft$2;
var tmpBinaryLeft$3;
var tmpBinaryLeft$4;
let tmpSwitchCheckCases = true;
let tmpSwitchFallthrough = false;
do {
  if (tmpSwitchCheckCases) {
    let ifTestTmp$1 = tmpSwitchFallthrough;
    if (ifTestTmp$1) {
    } else {
      tmpBinaryLeft = $(10);
      ifTestTmp$1 = tmpBinaryLeft === 6;
    }
    if (ifTestTmp$1) {
      $(1);
      break;
      tmpSwitchFallthrough = true;
    }
    let ifTestTmp$2 = tmpSwitchFallthrough;
    if (ifTestTmp$2) {
    } else {
      tmpBinaryLeft$1 = $(20);
      ifTestTmp$2 = tmpBinaryLeft$1 === 6;
    }
    if (ifTestTmp$2) {
      $(2);
      tmpSwitchFallthrough = true;
    }
  } else {
    tmpSwitchFallthrough = true;
  }
  if (tmpSwitchFallthrough) {
    $('d');
    tmpSwitchFallthrough = true;
  }
  let ifTestTmp$3 = tmpSwitchFallthrough;
  if (ifTestTmp$3) {
  } else {
    tmpBinaryLeft$2 = $(30);
    ifTestTmp$3 = tmpBinaryLeft$2 === 6;
  }
  if (ifTestTmp$3) {
    $(3);
    tmpSwitchFallthrough = true;
  }
  let ifTestTmp$4 = tmpSwitchFallthrough;
  if (ifTestTmp$4) {
  } else {
    tmpBinaryLeft$3 = $(40);
    ifTestTmp$4 = tmpBinaryLeft$3 === 6;
  }
  if (ifTestTmp$4) {
    $(4);
    break;
    tmpSwitchFallthrough = true;
  }
  let ifTestTmp$5 = tmpSwitchFallthrough;
  if (ifTestTmp$5) {
  } else {
    tmpBinaryLeft$4 = $(50);
    ifTestTmp$5 = tmpBinaryLeft$4 === 6;
  }
  if (ifTestTmp$5) {
    $(5);
    break;
    tmpSwitchFallthrough = true;
  }
  tmpSwitchCheckCases = false;
  ifTestTmp = tmpSwitchFallthrough === false;
} while (ifTestTmp);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 20
 - 2: 30
 - 3: 40
 - 4: 50
 - 5: "d"
 - 6: 3
 - 7: 4
 - 8: undefined

Normalized calls: Same

Final output calls: Same
