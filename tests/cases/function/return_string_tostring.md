# Preval test case

# return_string.md

> function > return_string
>
> A function that returns Date.now()

The function is assumed to be pure (no observable side effects) but still not inlinable, although Date.now() is probably insufficient to stop this.

#TODO

## Input

`````js filename=intro
function f() {
  return String.toString();
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg = String.toString();
  return tmpReturnArg;
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg = String.toString();
  return tmpReturnArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "function String() { [native code] }"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
