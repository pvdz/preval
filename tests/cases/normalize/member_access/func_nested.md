# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj.a.b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObj;
  const obj = { a: { b: $() } };
  return $(((tmpObj = obj.a), tmpObj).b);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  var tmpObj;
  const obj = { a: { b: $() } };
  return $(((tmpObj = obj.a), tmpObj).b);
}
$(f());
`````
