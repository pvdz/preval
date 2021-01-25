# Preval test case

# switch.md

> normalize > blocks > switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(2): $(3);
  case $(4):
  case $(5):
  case $(6): break;
  case $(7):
  default:
}
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryLeft$1;
var tmpBinaryLeft$2;
var tmpBinaryLeft$3;
var tmpBinaryLeft$4;
var tmpBinaryRight;
var tmpBinaryRight$1;
var tmpBinaryRight$2;
var tmpBinaryRight$3;
var tmpBinaryRight$4;
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = tmpSwitchTest;
    tmpBinaryRight = $(2);
    tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $(3);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpBinaryLeft$1 = tmpSwitchTest;
    tmpBinaryRight$1 = $(4);
    tmpIfTest$1 = tmpBinaryLeft$1 === tmpBinaryRight$1;
  }
  if (tmpIfTest$1) {
    ('case 1:');
    {
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$2 = tmpFallthrough;
  if (tmpIfTest$2) {
  } else {
    tmpBinaryLeft$2 = tmpSwitchTest;
    tmpBinaryRight$2 = $(5);
    tmpIfTest$2 = tmpBinaryLeft$2 === tmpBinaryRight$2;
  }
  if (tmpIfTest$2) {
    ('case 2:');
    {
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$3 = tmpFallthrough;
  if (tmpIfTest$3) {
  } else {
    tmpBinaryLeft$3 = tmpSwitchTest;
    tmpBinaryRight$3 = $(6);
    tmpIfTest$3 = tmpBinaryLeft$3 === tmpBinaryRight$3;
  }
  if (tmpIfTest$3) {
    ('case 3:');
    {
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$4 = tmpFallthrough;
  if (tmpIfTest$4) {
  } else {
    tmpBinaryLeft$4 = tmpSwitchTest;
    tmpBinaryRight$4 = $(7);
    tmpIfTest$4 = tmpBinaryLeft$4 === tmpBinaryRight$4;
  }
  if (tmpIfTest$4) {
    ('case 4:');
    {
    }
    tmpFallthrough = true;
  }
  {
    ('default case:');
  }
}
`````

## Output

`````js filename=intro
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpBinaryLeft = tmpSwitchTest;
    tmpBinaryRight = $(2);
    tmpIfTest = tmpBinaryLeft === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $(3);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpBinaryLeft$1 = tmpSwitchTest;
    tmpBinaryRight$1 = $(4);
    tmpIfTest$1 = tmpBinaryLeft$1 === tmpBinaryRight$1;
  }
  if (tmpIfTest$1) {
    ('case 1:');
    {
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$2 = tmpFallthrough;
  if (tmpIfTest$2) {
  } else {
    tmpBinaryLeft$2 = tmpSwitchTest;
    tmpBinaryRight$2 = $(5);
    tmpIfTest$2 = tmpBinaryLeft$2 === tmpBinaryRight$2;
  }
  if (tmpIfTest$2) {
    ('case 2:');
    {
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$3 = tmpFallthrough;
  if (tmpIfTest$3) {
  } else {
    tmpBinaryLeft$3 = tmpSwitchTest;
    tmpBinaryRight$3 = $(6);
    tmpIfTest$3 = tmpBinaryLeft$3 === tmpBinaryRight$3;
  }
  if (tmpIfTest$3) {
    ('case 3:');
    {
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$4 = tmpFallthrough;
  if (tmpIfTest$4) {
  } else {
    tmpBinaryLeft$4 = tmpSwitchTest;
    tmpBinaryRight$4 = $(7);
    tmpIfTest$4 = tmpBinaryLeft$4 === tmpBinaryRight$4;
  }
  if (tmpIfTest$4) {
    ('case 4:');
    {
    }
    tmpFallthrough = true;
  }
  {
    ('default case:');
  }
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 4
 - 3: 5
 - 4: 6
 - 5: 7
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1], '<crash[ <ref> is not defined ]>'];

