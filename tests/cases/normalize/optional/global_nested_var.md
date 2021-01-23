# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
const a = 10,
      b = (a, $(2))?.toString,
      c = (1, b)?.length
$(c);
`````

## Normalized

`````js filename=intro
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
const a = 10;
a;
tmpOptionalChaining = $(2);
tmpTernaryTest = tmpOptionalChaining == null;
let b;
if (tmpTernaryTest) {
  b = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.toString;
  b = tmpTernaryAlternate;
}
1;
tmpOptionalChaining$1 = b;
tmpTernaryTest$1 = tmpOptionalChaining$1 == null;
let c;
if (tmpTernaryTest$1) {
  c = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$1.length;
  c = tmpTernaryAlternate$1;
}
$(c);
`````

## Output

`````js filename=intro
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpOptionalChaining = $(2);
tmpTernaryTest = tmpOptionalChaining == null;
let b;
if (tmpTernaryTest) {
  b = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.toString;
  b = tmpTernaryAlternate;
}
tmpOptionalChaining$1 = b;
tmpTernaryTest$1 = tmpOptionalChaining$1 == null;
let c;
if (tmpTernaryTest$1) {
  c = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$1.length;
  c = tmpTernaryAlternate$1;
}
$(c);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 1
 - 2: undefined

Normalized calls: Same

Final output calls: Same
