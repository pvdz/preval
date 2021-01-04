# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  return $(obj.a.b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpComplexMemberObj;
  var tmpArg;
  var tmpComplexMemberObj_1;
  const obj = { a: { b: $() } };
  tmpComplexMemberObj = obj.a;
  tmpComplexMemberObj.b = 15;
  tmpComplexMemberObj_1 = obj.a;
  tmpArg = tmpComplexMemberObj_1.b;
  return $(tmpArg);
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f() {
  var tmpComplexMemberObj;
  var tmpArg;
  var tmpComplexMemberObj_1;
  const obj = { a: { b: $() } };
  tmpComplexMemberObj = obj.a;
  tmpComplexMemberObj.b = 15;
  tmpComplexMemberObj_1 = obj.a;
  tmpArg = tmpComplexMemberObj_1.b;
  return $(tmpArg);
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````
