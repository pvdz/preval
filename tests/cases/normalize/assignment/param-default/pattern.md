# Preval test case

# pattern.md

> normalize > assignment > param-default > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
function f(foo = [x, y] = z) {
  return foo;
}
$(f());
$(x, y, z);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    foo = arrAssignPatternRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
('<hoisted func decl `f`>');
let x = 1;
let y = 2;
let z = [10, 20, 30];
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  let foo;
  const tmpIfTest = $tdz$__foo === undefined;
  if (tmpIfTest) {
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    foo = arrAssignPatternRhs;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = f();
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: [10,20,30]
 - 1: 10,20,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
