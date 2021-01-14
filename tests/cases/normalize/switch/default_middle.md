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
var tmpBinaryLeft_1;
var tmpBinaryLeft_2;
var tmpBinaryLeft_3;
var tmpBinaryLeft_4;
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
          let ifTestTmp_1 = tmpSwitchFallthrough;
          if (ifTestTmp_1) {
          } else {
            tmpBinaryLeft = $(10);
            ifTestTmp_1 = tmpBinaryLeft === tmpSwitchValue;
          }
          if (ifTestTmp_1) {
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
          let ifTestTmp_2 = tmpSwitchFallthrough;
          if (ifTestTmp_2) {
          } else {
            tmpBinaryLeft_1 = $(20);
            ifTestTmp_2 = tmpBinaryLeft_1 === tmpSwitchValue;
          }
          if (ifTestTmp_2) {
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
            let ifTestTmp_3 = tmpSwitchFallthrough;
            if (ifTestTmp_3) {
            } else {
              tmpBinaryLeft_2 = $(30);
              ifTestTmp_3 = tmpBinaryLeft_2 === tmpSwitchValue;
            }
            if (ifTestTmp_3) {
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
            let ifTestTmp_4 = tmpSwitchFallthrough;
            if (ifTestTmp_4) {
            } else {
              tmpBinaryLeft_3 = $(40);
              ifTestTmp_4 = tmpBinaryLeft_3 === tmpSwitchValue;
            }
            if (ifTestTmp_4) {
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
            let ifTestTmp_5 = tmpSwitchFallthrough;
            if (ifTestTmp_5) {
            } else {
              tmpBinaryLeft_4 = $(50);
              ifTestTmp_5 = tmpBinaryLeft_4 === tmpSwitchValue;
            }
            if (ifTestTmp_5) {
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
    tmpSwitchCheckCases = true;
    ifTestTmp = tmpSwitchFallthrough === false;
  } while (ifTestTmp);
}
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
{
  var x = 8;
  var x = x;
  var x = x;
  do {
    if (x) {
      ('str');
      {
        ('str');
        {
          var x = x;
          if (x) {
          } else {
            x = x(8);
            x = x * x;
          }
          if (x) {
            {
              x(8);
              break;
            }
            x = x;
          }
        }
      }
      {
        ('str');
        {
          var x = x;
          if (x) {
          } else {
            x = x(8);
            x = x * x;
          }
          if (x) {
            {
              x(8);
            }
            x = x;
          }
        }
      }
    } else {
      x = x;
    }
    if (x) {
      ('str');
      {
        x('str');
      }
      x = x;
    }
    {
      {
        ('str');
        {
          ('str');
          {
            var x = x;
            if (x) {
            } else {
              x = x(8);
              x = x * x;
            }
            if (x) {
              {
                x(8);
              }
              x = x;
            }
          }
        }
        {
          ('str');
          {
            var x = x;
            if (x) {
            } else {
              x = x(8);
              x = x * x;
            }
            if (x) {
              {
                x(8);
                break;
              }
              x = x;
            }
          }
        }
        {
          ('str');
          {
            var x = x;
            if (x) {
            } else {
              x = x(8);
              x = x * x;
            }
            if (x) {
              {
                x(8);
                break;
              }
              x = x;
            }
          }
        }
      }
    }
    x = x;
    x = x * x;
  } while (x);
}
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpBinaryLeft;
var tmpBinaryLeft_1;
var tmpBinaryLeft_2;
var tmpBinaryLeft_3;
var tmpBinaryLeft_4;
let tmpSwitchCheckCases = true;
let tmpSwitchFallthrough = false;
do {
  if (tmpSwitchCheckCases) {
    let ifTestTmp_1 = tmpSwitchFallthrough;
    if (ifTestTmp_1) {
    } else {
      tmpBinaryLeft = $(10);
      ifTestTmp_1 = tmpBinaryLeft === 6;
    }
    if (ifTestTmp_1) {
      $(1);
      break;
      tmpSwitchFallthrough = true;
    }
    let ifTestTmp_2 = tmpSwitchFallthrough;
    if (ifTestTmp_2) {
    } else {
      tmpBinaryLeft_1 = $(20);
      ifTestTmp_2 = tmpBinaryLeft_1 === 6;
    }
    if (ifTestTmp_2) {
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
  let ifTestTmp_3 = tmpSwitchFallthrough;
  if (ifTestTmp_3) {
  } else {
    tmpBinaryLeft_2 = $(30);
    ifTestTmp_3 = tmpBinaryLeft_2 === 6;
  }
  if (ifTestTmp_3) {
    $(3);
    tmpSwitchFallthrough = true;
  }
  let ifTestTmp_4 = tmpSwitchFallthrough;
  if (ifTestTmp_4) {
  } else {
    tmpBinaryLeft_3 = $(40);
    ifTestTmp_4 = tmpBinaryLeft_3 === 6;
  }
  if (ifTestTmp_4) {
    $(4);
    break;
    tmpSwitchFallthrough = true;
  }
  let ifTestTmp_5 = tmpSwitchFallthrough;
  if (ifTestTmp_5) {
  } else {
    tmpBinaryLeft_4 = $(50);
    ifTestTmp_5 = tmpBinaryLeft_4 === 6;
  }
  if (ifTestTmp_5) {
    $(5);
    break;
    tmpSwitchFallthrough = true;
  }
  tmpSwitchCheckCases = true;
  ifTestTmp = tmpSwitchFallthrough === false;
} while (ifTestTmp);
`````
