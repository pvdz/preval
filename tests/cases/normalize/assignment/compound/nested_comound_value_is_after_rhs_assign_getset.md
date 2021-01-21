# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

Test case to demonstrate that `a = b += c` assigns `b+c` to `a`, not just `c`.

Add getters/setters to ensure proper order for all steps.

#TODO

## Input

`````js filename=intro
let a = 1, b = {get c(){ $(1); return 5; }, set c(x){ $(2, x); }};
a = b.c += 500
$(a, b);
`````

## Normalized

`````js filename=intro
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
let a = 1;
let b = {
  get c() {
    $(1);
    return 5;
  },
  set c(x) {
    $(2, x);
  },
};
tmpBinaryLeft = b.c;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + 500;
b.c = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
$(a, b);
`````

## Output

`````js filename=intro
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
let a = 1;
let b = {
  get c() {
    $(1);
    return 5;
  },
  set c(x) {
    $(2, x);
  },
};
tmpBinaryLeft = b.c;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + 500;
b.c = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
$(a, b);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2,505
 - 2: 505,{"c":5}
 - 3: undefined

Normalized calls: Same

Final output calls: Same
