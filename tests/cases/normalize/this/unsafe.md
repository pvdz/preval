# Preval test case

# unsafe.md

> Normalize > This > Unsafe
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

#TODO

## Input

`````js filename=intro
function f() {
  const x = this;
  function g() {
     return x; // Should not be inlined
  }
  return g();
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const x = this;
  function g() {
    return x;
  }
  const tmpReturnArg = g();
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const x = this;
  function g() {
    return x;
  }
  const tmpReturnArg = g();
  return tmpReturnArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same