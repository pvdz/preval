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
  var tmpObj;
  var tmpObj_1;
  const obj = { a: { b: $() } };
  ((tmpObj = obj.a), tmpObj).b = 15;
  return $(((tmpObj_1 = obj.a), tmpObj_1).b);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  var tmpObj;
  var tmpObj_1;
  const obj = { a: { b: $() } };
  ((tmpObj = obj.a), tmpObj).b = 15;
  return $(((tmpObj_1 = obj.a), tmpObj_1).b);
}
$(f());
`````
