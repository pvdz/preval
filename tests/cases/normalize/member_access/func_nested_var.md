# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = (a, $(2)).toString,
        c = (1, b).length
  return $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObj;
  const a = 10,
    b = ((tmpObj = (a, $(2))), tmpObj).toString,
    c = (1, b).length;
  return $(c);
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  var tmpObj;
  const b = ((tmpObj = (10, $(2))), tmpObj).toString,
    c = (1, b).length;
  return $(c);
}
$(f());
`````
