# Preval test case

# global_nested_var.md

> Normalize > Nullish > Global nested var
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
const a = 10,
      b = (a, $(2))??toString,
      c = (1, b)??length
$(c);
`````

## Pre Normal


`````js filename=intro
const a = 10,
  b = (a, $(2)) ?? toString,
  c = (1, b) ?? length;
$(c);
`````

## Normalized


`````js filename=intro
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
$(c);
`````

## Output


`````js filename=intro
const b = $(2);
const tmpIfTest /*:boolean*/ = b == null;
let c = undefined;
let tmpIfTest$1 /*:boolean*/ = false;
if (tmpIfTest) {
  const tmpClusterSSA_b = toString;
  c = tmpClusterSSA_b;
  tmpIfTest$1 = tmpClusterSSA_b == null;
} else {
  c = b;
  tmpIfTest$1 = b == null;
}
if (tmpIfTest$1) {
  const tmpClusterSSA_c = length;
  $(tmpClusterSSA_c);
} else {
  $(c);
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
  const e = toString;
  c = e;
  d = e == null;
}
else {
  c = a;
  d = a == null;
}
if (d) {
  const f = length;
  $( f );
}
else {
  $( c );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

toString, length

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
