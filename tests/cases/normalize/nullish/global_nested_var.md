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
var tmpNullish;
var tmpNullish$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
const a = 10;
a;
tmpNullish = $(2);
tmpTernaryTest = tmpNullish == null;
let b;
if (tmpTernaryTest) {
  b = toString;
} else {
  b = tmpNullish;
}
1;
tmpNullish$1 = b;
tmpTernaryTest$1 = tmpNullish$1 == null;
let c;
if (tmpTernaryTest$1) {
  c = length;
} else {
  c = tmpNullish$1;
}
$(c);
`````

## Output

`````js filename=intro
var tmpNullish;
var tmpNullish$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpNullish = $(2);
tmpTernaryTest = tmpNullish == null;
let b;
if (tmpTernaryTest) {
  b = toString;
} else {
  b = tmpNullish;
}
tmpNullish$1 = b;
tmpTernaryTest$1 = tmpNullish$1 == null;
let c;
if (tmpTernaryTest$1) {
  c = length;
} else {
  c = tmpNullish$1;
}
$(c);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
