# Preval test case

# poc_in.md

> normalize > switch > poc_in
>
> Fall through example

Ideally it ends up with something like this, except the case blocks are abstracted into arrows.

```js
exit: {
  let x = 1;

  let tmpBinaryRight = $(1);
  if (1 === tmpBinaryRight) {
    $('A');
    $('B');
    break exit;
  } 

  let tmpBinaryRight_1 = $(2);
  if (x === tmpBinaryRight_1) {
    $('B');
    break exit;
  }

  let tmpBinaryRight_2 = $(3);
  if (x === tmpBinaryRight_2) {
    $('C');
  }
}
```

#TODO

## Input

`````js filename=intro
let x = 1;
switch (x) {
 case $(1):
   $('A');
 case $(2):
   $('B');
   break;
 case $(3):
   $('C');
   break;
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
let x = 1;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryLeft = x;
      tmpBinaryRight = $(1);
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('A');
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = tmpFallthrough;
    if (ifTestTmp_1) {
    } else {
      tmpBinaryLeft_1 = x;
      tmpBinaryRight_1 = $(2);
      ifTestTmp_1 = tmpBinaryLeft_1 === tmpBinaryRight_1;
    }
    if (ifTestTmp_1) {
      ('case 1:');
      {
        $('B');
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_2 = tmpFallthrough;
    if (ifTestTmp_2) {
    } else {
      tmpBinaryLeft_2 = x;
      tmpBinaryRight_2 = $(3);
      ifTestTmp_2 = tmpBinaryLeft_2 === tmpBinaryRight_2;
    }
    if (ifTestTmp_2) {
      ('case 2:');
      {
        $('C');
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
      tmpBinaryLeft = x;
      tmpBinaryRight = $(1);
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('A');
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = tmpFallthrough;
    if (ifTestTmp_1) {
    } else {
      tmpBinaryLeft_1 = x;
      tmpBinaryRight_1 = $(2);
      ifTestTmp_1 = tmpBinaryLeft_1 === tmpBinaryRight_1;
    }
    if (ifTestTmp_1) {
      ('case 1:');
      {
        $('B');
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp_2 = tmpFallthrough;
    if (ifTestTmp_2) {
    } else {
      tmpBinaryLeft_2 = x;
      tmpBinaryRight_2 = $(3);
      ifTestTmp_2 = tmpBinaryLeft_2 === tmpBinaryRight_2;
    }
    if (ifTestTmp_2) {
      ('case 2:');
      {
        $('C');
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Result

Should call `$` with:
[[1], [2], [3], null];

Normalized calls: Same

Final output calls: Same
