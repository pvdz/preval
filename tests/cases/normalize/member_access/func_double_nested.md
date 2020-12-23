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
  var tmpObj;
  var tmpObj_1;
  const obj = { a: { b: { c: $() } } };
  return $(((tmpObj = ((tmpObj_1 = obj.a), tmpObj_1).b), tmpObj).c);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  var tmpObj;
  var tmpObj_1;
  const obj = { a: { b: { c: $() } } };
  return $(((tmpObj = ((tmpObj_1 = obj.a), tmpObj_1).b), tmpObj).c);
}
$(f());
`````
