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
  debugger;
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
  debugger;
  const a = 10;
  let b = $(2);
  const tmpIfTest = b == null;
  if (tmpIfTest) {
    b = toString;
  } else {
  }
  let c = b;
  const tmpIfTest$1 = c == null;
  if (tmpIfTest$1) {
    c = length;
  } else {
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
let b = $(2);
const tmpIfTest = b == null;
let c = undefined;
let tmpIfTest$1 = false;
if (tmpIfTest) {
  b = toString;
  c = b;
  tmpIfTest$1 = c == null;
} else {
  c = b;
  tmpIfTest$1 = c == null;
}
let tmpReturnArg = undefined;
if (tmpIfTest$1) {
  c = length;
  tmpReturnArg = $(c);
  $(tmpReturnArg);
} else {
  tmpReturnArg = $(c);
  $(tmpReturnArg);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 2 );
const b = a == null;
let c = undefined;
let d = false;
if (b) {
  a = toString;
  c = a;
  d = c == null;
}
else {
  c = a;
  d = c == null;
}
let e = undefined;
if (d) {
  c = length;
  e = $( c );
  $( e );
}
else {
  e = $( c );
  $( e );
}
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
