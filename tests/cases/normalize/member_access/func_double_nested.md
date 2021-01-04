# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj.a.b.c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpComplexMemberObj;
  var tmpComplexMemberObj_1;
  const obj = { a: { b: { c: $() } } };
  tmpComplexMemberObj_1 = obj.a;
  tmpComplexMemberObj = tmpComplexMemberObj_1.b;
  tmpArg = tmpComplexMemberObj.c;
  return $(tmpArg);
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpComplexMemberObj;
  var tmpComplexMemberObj_1;
  const obj = { a: { b: { c: $() } } };
  tmpComplexMemberObj_1 = obj.a;
  tmpComplexMemberObj = tmpComplexMemberObj_1.b;
  tmpArg = tmpComplexMemberObj.c;
  return $(tmpArg);
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````
