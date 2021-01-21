# Preval test case

# simple_pattern.md

> normalize > assignment > param-default > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
function f(foo = a = [x, y] = z) {
  return foo;
}
$(f());
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      arrAssignPatternRhs = z;
      arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      y = arrPatternSplat[1];
      a = arrAssignPatternRhs;
      foo = arrAssignPatternRhs;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = f();
$(tmpArg);
$(a, x, y, z);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a = arrAssignPatternRhs;
    foo = arrAssignPatternRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = f();
$(tmpArg);
$(a, x, y, z);
`````

## Result

Should call `$` with:
 - 0: [10,20,30]
 - 1: [10,20,30],10,20,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
