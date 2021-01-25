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
var tmpBinaryLeft$1;
var tmpBinaryLeft$2;
var tmpBinaryRight;
var tmpBinaryRight$1;
var tmpBinaryRight$2;
let x;
let fallthrough = false;
exit: {
  let tmpIfTest = fallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = x;
    tmpBinaryRight = $(1);
    tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
  }
  if (tmpIfTest) {
    {
      $('A');
    }
    fallthrough = true;
  }
  let tmpIfTest$1 = fallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpBinaryLeft$1 = x;
    tmpBinaryRight$1 = $(2);
    tmpIfTest$1 = tmpBinaryLeft$1 === tmpBinaryRight$1;
  }
  if (tmpIfTest$1) {
    {
      $('B');
      break exit;
    }
    fallthrough = true;
  }
  let tmpIfTest$2 = fallthrough;
  if (tmpIfTest$2) {
  } else {
    tmpBinaryLeft$2 = x;
    tmpBinaryRight$2 = $(3);
    tmpIfTest$2 = tmpBinaryLeft$2 === tmpBinaryRight$2;
  }
  if (tmpIfTest$2) {
    {
      $('C');
      break exit;
    }
    fallthrough = true;
  }
}
`````

## Output

`````js filename=intro
exit: {
  let tmpIfTest = fallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = x;
    tmpBinaryRight = $(1);
    tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
  }
  if (tmpIfTest) {
    {
      $('A');
    }
    fallthrough = true;
  }
  let tmpIfTest$1 = fallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpBinaryLeft$1 = x;
    tmpBinaryRight$1 = $(2);
    tmpIfTest$1 = tmpBinaryLeft$1 === tmpBinaryRight$1;
  }
  if (tmpIfTest$1) {
    {
      $('B');
      break exit;
    }
    fallthrough = true;
  }
  let tmpIfTest$2 = fallthrough;
  if (tmpIfTest$2) {
  } else {
    tmpBinaryLeft$2 = x;
    tmpBinaryRight$2 = $(3);
    tmpIfTest$2 = tmpBinaryLeft$2 === tmpBinaryRight$2;
  }
  if (tmpIfTest$2) {
    {
      $('C');
      break exit;
    }
    fallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
['<crash[ <ref> is not defined ]>'];

