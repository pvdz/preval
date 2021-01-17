# Preval test case

# pattern_pattern.md

> normalize > assignment > param-default > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
function f(foo = [a, b] = [, x, y] = z) {
  return foo;
}
$(f());
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  var arrAssignPatternRhs_1;
  var arrPatternSplat_1;
  var tmpNestedComplexRhs;
  var tmpNestedComplexRhs_1;
  {
    let foo;
    {
      let ifTestTmp = $tdz$__foo === undefined;
      if (ifTestTmp) {
        arrAssignPatternRhs_1 = z;
        arrPatternSplat_1 = [...arrAssignPatternRhs_1];
        x = arrPatternSplat_1[1];
        tmpNestedComplexRhs = arrPatternSplat_1[2];
        y = tmpNestedComplexRhs;
        arrAssignPatternRhs = tmpNestedComplexRhs;
        arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        tmpNestedComplexRhs_1 = arrPatternSplat[1];
        b = tmpNestedComplexRhs_1;
        foo = tmpNestedComplexRhs_1;
      } else {
        foo = $tdz$__foo;
      }
    }
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = f();
$(tmpArg);
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  var arrAssignPatternRhs_1;
  var arrPatternSplat_1;
  var tmpNestedComplexRhs;
  var tmpNestedComplexRhs_1;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    arrAssignPatternRhs_1 = z;
    arrPatternSplat_1 = [...arrAssignPatternRhs_1];
    x = arrPatternSplat_1[1];
    tmpNestedComplexRhs = arrPatternSplat_1[2];
    y = tmpNestedComplexRhs;
    arrAssignPatternRhs = tmpNestedComplexRhs;
    arrPatternSplat = [...arrAssignPatternRhs];
    a = arrPatternSplat[0];
    tmpNestedComplexRhs_1 = arrPatternSplat[1];
    b = tmpNestedComplexRhs_1;
    foo = tmpNestedComplexRhs_1;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = f();
$(tmpArg);
$(a, b, x, y, z);
`````
