# Preval test case

# ident_sequence_complex.md

> normalize > assignment > ternary-c > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$($(false) ? true : (a = ($(b), $(c))));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  $(b);
  tmpNestedComplexRhs = $(c);
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedComplexRhs;
let a = 1;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  $(2);
  tmpNestedComplexRhs = $(3);
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: 2
 - 2: 3
 - 3: null
 - 4: null,2,3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
