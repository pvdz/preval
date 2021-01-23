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
var tmpBinaryLeft$1;
var tmpBinaryRight$1;
var tmpBinaryLeft$2;
var tmpBinaryRight$2;
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
    let ifTestTmp$1 = tmpFallthrough;
    if (ifTestTmp$1) {
    } else {
      tmpBinaryLeft$1 = x;
      tmpBinaryRight$1 = $(2);
      ifTestTmp$1 = tmpBinaryLeft$1 === tmpBinaryRight$1;
    }
    if (ifTestTmp$1) {
      ('case 1:');
      {
        $('B');
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp$2 = tmpFallthrough;
    if (ifTestTmp$2) {
    } else {
      tmpBinaryLeft$2 = x;
      tmpBinaryRight$2 = $(3);
      ifTestTmp$2 = tmpBinaryLeft$2 === tmpBinaryRight$2;
    }
    if (ifTestTmp$2) {
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
    let ifTestTmp$1 = tmpFallthrough;
    if (ifTestTmp$1) {
    } else {
      tmpBinaryLeft$1 = x;
      tmpBinaryRight$1 = $(2);
      ifTestTmp$1 = tmpBinaryLeft$1 === tmpBinaryRight$1;
    }
    if (ifTestTmp$1) {
      ('case 1:');
      {
        $('B');
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
  {
    let ifTestTmp$2 = tmpFallthrough;
    if (ifTestTmp$2) {
    } else {
      tmpBinaryLeft$2 = x;
      tmpBinaryRight$2 = $(3);
      ifTestTmp$2 = tmpBinaryLeft$2 === tmpBinaryRight$2;
    }
    if (ifTestTmp$2) {
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
 - 0: 1
 - 1: "A"
 - 2: "B"
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1], [2], [3], null];

