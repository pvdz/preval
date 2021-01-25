# Preval test case

# switch_case.md

> normalize > pattern > binding > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

However, the TDZ is still active so this should be an error. 

#TODO

## Input

`````js filename=intro
switch (1) {
  case 0:
    let [a, b] = [10, 20];
  case 1:
    [a, b] = [30, 40];
}
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
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
        arrAssignPatternRhs = [10, 20];
        arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        b = arrPatternSplat[1];
        arrAssignPatternRhs;
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
        arrAssignPatternRhs$1 = [30, 40];
        arrPatternSplat$1 = [...arrAssignPatternRhs$1];
        a = arrPatternSplat$1[0];
        b = arrPatternSplat$1[1];
        arrAssignPatternRhs$1;
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
let a;
let b;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  arrAssignPatternRhs = [10, 20];
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  tmpFallthrough = true;
}
let tmpIfTest$1 = tmpFallthrough;
if (tmpIfTest$1) {
} else {
  tmpIfTest$1 = true;
}
if (tmpIfTest$1) {
  arrAssignPatternRhs$1 = [30, 40];
  arrPatternSplat$1 = [...arrAssignPatternRhs$1];
  a = arrPatternSplat$1[0];
  b = arrPatternSplat$1[1];
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

