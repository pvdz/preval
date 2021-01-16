# Preval test case

# poc.md

> normalize > switch > poc
>
> Just a thought

For something like

```js
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
```

#TODO

## Input

`````js filename=intro
let x;
let fallthrough = false;
exit: {
  if (fallthrough || x === $(1)) {
    {
      $('A');
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(2)) {
    {
      $('B');
      break exit;
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(3)) {
    {
      $('C');
      break exit;
    }
    fallthrough = true;
  }
}
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var tmpBinaryRight_1;
var tmpBinaryRight_2;
let x;
let fallthrough = false;
exit: {
  {
    let ifTestTmp = fallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryRight = $(1);
      ifTestTmp = x === tmpBinaryRight;
    }
    if (ifTestTmp) {
      {
        $('A');
      }
      fallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = fallthrough;
    if (ifTestTmp_1) {
    } else {
      tmpBinaryRight_1 = $(2);
      ifTestTmp_1 = x === tmpBinaryRight_1;
    }
    if (ifTestTmp_1) {
      {
        $('B');
        break exit;
      }
      fallthrough = true;
    }
  }
  {
    let ifTestTmp_2 = fallthrough;
    if (ifTestTmp_2) {
    } else {
      tmpBinaryRight_2 = $(3);
      ifTestTmp_2 = x === tmpBinaryRight_2;
    }
    if (ifTestTmp_2) {
      {
        $('C');
        break exit;
      }
      fallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
exit: {
  {
    let ifTestTmp = fallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryRight = $(1);
      ifTestTmp = x === tmpBinaryRight;
    }
    if (ifTestTmp) {
      {
        $('A');
      }
      fallthrough = true;
    }
  }
  {
    let ifTestTmp_1 = fallthrough;
    if (ifTestTmp_1) {
    } else {
      tmpBinaryRight_1 = $(2);
      ifTestTmp_1 = x === tmpBinaryRight_1;
    }
    if (ifTestTmp_1) {
      {
        $('B');
        break exit;
      }
      fallthrough = true;
    }
  }
  {
    let ifTestTmp_2 = fallthrough;
    if (ifTestTmp_2) {
    } else {
      tmpBinaryRight_2 = $(3);
      ifTestTmp_2 = x === tmpBinaryRight_2;
    }
    if (ifTestTmp_2) {
      {
        $('C');
        break exit;
      }
      fallthrough = true;
    }
  }
}
`````
