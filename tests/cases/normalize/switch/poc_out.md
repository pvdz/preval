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
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
var tmpBinaryLeft_2;
var tmpBinaryRight_2;
let x;
let fallthrough = false;
exit: {
  {
    let ifTestTmp = fallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryLeft = x;
      tmpBinaryRight = $(1);
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
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
      tmpBinaryLeft_1 = x;
      tmpBinaryRight_1 = $(2);
      ifTestTmp_1 = tmpBinaryLeft_1 === tmpBinaryRight_1;
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
      tmpBinaryLeft_2 = x;
      tmpBinaryRight_2 = $(3);
      ifTestTmp_2 = tmpBinaryLeft_2 === tmpBinaryRight_2;
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
      tmpBinaryLeft = x;
      tmpBinaryRight = $(1);
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
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
      tmpBinaryLeft_1 = x;
      tmpBinaryRight_1 = $(2);
      ifTestTmp_1 = tmpBinaryLeft_1 === tmpBinaryRight_1;
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
      tmpBinaryLeft_2 = x;
      tmpBinaryRight_2 = $(3);
      ifTestTmp_2 = tmpBinaryLeft_2 === tmpBinaryRight_2;
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

## Result

Should call `$` with:
[[1], ['A'], ['B'], null];

Normalized calls: Same

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

