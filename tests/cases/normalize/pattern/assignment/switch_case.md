# Preval test case

# switch_case.md

> normalize > pattern > assignment > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

#TODO

## Input

`````js filename=intro
switch (0) {
  case 0:
    let a = 10;
    let b = 20;
    [a, b] = [30, 40];
    $(a, b);
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
      tmpIfTest = 0 === 0;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        a = 10;
        b = 20;
        arrAssignPatternRhs = [30, 40];
        arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        b = arrPatternSplat[1];
        arrAssignPatternRhs;
        $(a, b);
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
  arrAssignPatternRhs = [30, 40];
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  $(a, b);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 0: 30,40
 - 1: undefined

Normalized calls: Same

Final output calls: Same
