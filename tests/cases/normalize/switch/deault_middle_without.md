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
let fall = false;
exit: {
  if (x === $(10)) {
    $(1);
    break exit;
  }
  if (fall || x === $(20)) {
    $(1);
    fall = true
  }
  if (fall || x === $(30)) {
    $(3);
    fall = true;
  }
  if (fall || x === $(40)) {
    $(4);
    break exit;
  }
  if (fall || x === $(50)) {
    $(5);
  }
}
```



#TODO

## Input

`````js filename=intro
switch (6) {
  case $(10): $(1); break;
  case $(20): $(2);
  case $(30): $(3);
  case $(40): $(4); break;
  case $(50): $(5); break;
}
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpBinaryRight_1;
var tmpBinaryRight_2;
var tmpBinaryRight_3;
var tmpBinaryRight_4;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryRight = $(10);
      ifTestTmp = 6 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $(1);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = tmpFallthrough;
    if (ifTestTmp_1) {
    } else {
      tmpBinaryRight_1 = $(20);
      ifTestTmp_1 = 6 === tmpBinaryRight_1;
    }
    if (ifTestTmp_1) {
      ('case 1:');
      {
        $(2);
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_2 = tmpFallthrough;
    if (ifTestTmp_2) {
    } else {
      tmpBinaryRight_2 = $(30);
      ifTestTmp_2 = 6 === tmpBinaryRight_2;
    }
    if (ifTestTmp_2) {
      ('case 2:');
      {
        $(3);
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_3 = tmpFallthrough;
    if (ifTestTmp_3) {
    } else {
      tmpBinaryRight_3 = $(40);
      ifTestTmp_3 = 6 === tmpBinaryRight_3;
    }
    if (ifTestTmp_3) {
      ('case 3:');
      {
        $(4);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_4 = tmpFallthrough;
    if (ifTestTmp_4) {
    } else {
      tmpBinaryRight_4 = $(50);
      ifTestTmp_4 = 6 === tmpBinaryRight_4;
    }
    if (ifTestTmp_4) {
      ('case 4:');
      {
        $(5);
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
      tmpBinaryRight = $(10);
      ifTestTmp = 6 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $(1);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = tmpFallthrough;
    if (ifTestTmp_1) {
    } else {
      tmpBinaryRight_1 = $(20);
      ifTestTmp_1 = 6 === tmpBinaryRight_1;
    }
    if (ifTestTmp_1) {
      ('case 1:');
      {
        $(2);
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_2 = tmpFallthrough;
    if (ifTestTmp_2) {
    } else {
      tmpBinaryRight_2 = $(30);
      ifTestTmp_2 = 6 === tmpBinaryRight_2;
    }
    if (ifTestTmp_2) {
      ('case 2:');
      {
        $(3);
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_3 = tmpFallthrough;
    if (ifTestTmp_3) {
    } else {
      tmpBinaryRight_3 = $(40);
      ifTestTmp_3 = 6 === tmpBinaryRight_3;
    }
    if (ifTestTmp_3) {
      ('case 3:');
      {
        $(4);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_4 = tmpFallthrough;
    if (ifTestTmp_4) {
    } else {
      tmpBinaryRight_4 = $(50);
      ifTestTmp_4 = 6 === tmpBinaryRight_4;
    }
    if (ifTestTmp_4) {
      ('case 4:');
      {
        $(5);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 20
 - 2: 30
 - 3: 40
 - 4: 50
 - 5: undefined

Normalized calls: Same

Final output calls: Same
