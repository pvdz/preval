# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
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

## Normalized

`````js filename=intro
const a = 10;
let b = $(2);
const tmpIfTest = b == null;
if (tmpIfTest) {
  b = toString;
}
1;
let c = b;
const tmpIfTest$1 = c == null;
if (tmpIfTest$1) {
  c = length;
}
$(c);
`````

## Output

`````js filename=intro
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
$(c);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
