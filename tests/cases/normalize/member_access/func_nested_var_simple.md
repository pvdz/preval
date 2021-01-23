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
        b = $(2).toString,
        c = b.length
  return $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const a = 10;
  const tmpBindingInit = $(2);
  const b = tmpBindingInit.toString;
  const c = b.length;
  {
    let tmpReturnArg = $(c);
    return tmpReturnArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  const tmpBindingInit = $(2);
  const b = tmpBindingInit.toString;
  const c = b.length;
  let tmpReturnArg = $(c);
  return tmpReturnArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 1
 - 2: 1
 - 3: undefined

Normalized calls: Same

Final output calls: Same
