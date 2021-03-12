# Preval test case

# func_nested_var.md

> Normalize > Nullish > Func nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = (a, $(2))??toString,
        c = (1, b)??length
  return $(c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const a = 10,
    b = (a, $(2)) ?? toString,
    c = (1, b) ?? length;
  return $(c);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const a = 10;
  let b = $(2);
  const tmpIfTest = b == null;
  if (tmpIfTest) {
    b = toString;
  }
  let c = b;
  const tmpIfTest$1 = c == null;
  if (tmpIfTest$1) {
    c = length;
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  let b = $(2);
  const tmpIfTest = b == null;
  if (tmpIfTest) {
    b = toString;
  }
  let c = b;
  const tmpIfTest$1 = c == null;
  if (tmpIfTest$1) {
    c = length;
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 2 implicit global bindings:

toString, length

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
