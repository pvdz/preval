# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15).foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObj;
  return $(((tmpObj = parseInt(15)), tmpObj).foo);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  var tmpObj;
  return $(((tmpObj = parseInt(15)), tmpObj).foo);
}
$(f());
`````
