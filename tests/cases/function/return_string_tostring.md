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
  {
    let tmpStmtArg = String.toString();
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  let tmpStmtArg = String.toString();
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
[['function String() { [native code] }'], null];

Normalized calls: Same

Final output calls: Same
