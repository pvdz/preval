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
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpOptionalChaining_1;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
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
tmpOptionalChaining_1 = b;
tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
let c;
if (tmpTernaryTest_1) {
  c = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining_1.length;
  c = tmpTernaryAlternate_1;
}
$(c);
`````

## Output

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpOptionalChaining_1;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpOptionalChaining = $(2);
tmpTernaryTest = tmpOptionalChaining == null;
let b;
if (tmpTernaryTest) {
  b = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.toString;
  b = tmpTernaryAlternate;
}
tmpOptionalChaining_1 = b;
tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
let c;
if (tmpTernaryTest_1) {
  c = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining_1.length;
  c = tmpTernaryAlternate_1;
}
$(c);
`````

## Result

Should call `$` with:
[[2], [null], null];

Normalized calls: Same

Final output calls: Same
