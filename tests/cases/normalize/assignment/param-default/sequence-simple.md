# Preval test case

# sequence-simple.md

> normalize > assignment > param-default > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
function f(foo = (a, b).c = d) {
  return foo;
}
$(f());
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignObj;
  let foo;
  {
    let ifTestTmp = $tdz$__foo === undefined;
    if (ifTestTmp) {
      a;
      tmpNestedAssignObj = b;
      tmpNestedAssignObj.c = d;
      foo = d;
    } else {
      foo = $tdz$__foo;
    }
  }
  return foo;
}
var tmpArg;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpArg = f();
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
function f($tdz$__foo) {
  var tmpNestedAssignObj;
  let foo;
  let ifTestTmp = $tdz$__foo === undefined;
  if (ifTestTmp) {
    tmpNestedAssignObj = b;
    tmpNestedAssignObj.c = 3;
    foo = 3;
  } else {
    foo = $tdz$__foo;
  }
  return foo;
}
var tmpArg;
let b = { c: 2 };
tmpArg = f();
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[3], '<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
