# Preval test case

# func_nested_var_simple.md

> Normalize > Nullish > Func nested var simple
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = $(2) ?? implicitA,
        c = b ?? implicitB
  return $(c);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const a = 10,
    b = $(2) ?? implicitA,
    c = b ?? implicitB;
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
    b = implicitA;
  } else {
  }
  let c = b;
  const tmpIfTest$1 = c == null;
  if (tmpIfTest$1) {
    c = implicitB;
  } else {
  }
  const tmpReturnArg = $(c);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const b /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = b == null;
let c /*:unknown*/ = undefined;
let tmpIfTest$1 /*:boolean*/ = false;
if (tmpIfTest) {
  const tmpClusterSSA_b /*:unknown*/ = implicitA;
  c = tmpClusterSSA_b;
  tmpIfTest$1 = tmpClusterSSA_b == null;
} else {
  c = b;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  const tmpClusterSSA_c /*:unknown*/ = implicitB;
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(tmpClusterSSA_c);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(c);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = a == null;
let c = undefined;
let d = false;
if (b) {
  const e = implicitA;
  c = e;
  d = e == null;
}
else {
  c = a;
  d = a == null;
}
if (d) {
  const f = implicitB;
  const g = $( f );
  $( g );
}
else {
  const h = $( c );
  $( h );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

implicitA, implicitB

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
