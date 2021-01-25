# Preval test case

# switch_case.md

> normalize > pattern > assignment > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

However, the TDZ is still active so this should be an error.

There might not be a possibility to retain this error after a transform without significant code duplication.

#TODO

## Input

`````js filename=intro
switch (1) {
  case 0:
    let a = 10;
    let b = 20;
  case 1:
    [a, b] = [30, 40];
}
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
{
  let a;
  let b;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 0;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        a = 10;
        b = 20;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$1 = tmpFallthrough;
    if (tmpIfTest$1) {
    } else {
      tmpIfTest$1 = 1 === 1;
    }
    if (tmpIfTest$1) {
      ('case 1:');
      {
        arrAssignPatternRhs = [30, 40];
        arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        b = arrPatternSplat[1];
        arrAssignPatternRhs;
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let a;
let b;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  a = 10;
  b = 20;
  tmpFallthrough = true;
}
let tmpIfTest$1 = tmpFallthrough;
if (tmpIfTest$1) {
} else {
  tmpIfTest$1 = true;
}
if (tmpIfTest$1) {
  arrAssignPatternRhs = [30, 40];
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot access 'a' before initialization ]>

Normalized calls: BAD?!
[null];

Final output calls: BAD!!
[null];

