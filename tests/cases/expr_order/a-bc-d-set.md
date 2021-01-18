# Preval test case

# a-bc-d.md

> expr_order > a-bc-d
>
> Double check whether this can't be broken

#TODO

## Input

`````js filename=intro
let a = 1;
let b = {
    set c(x) { $('b.set'); b = null; d = null; return 7; },
};
let d = 3;
// This should _NOT_ crash. Despite all attempts to set b to null.
a = b.c = d;
// b should end up being null, d should end up being null, a should be 3.
$(a, b, d);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
let a = 1;
let b = {
  set c(x) {
    $('b.set');
    b = null;
    d = null;
    return 7;
  },
};
let d = 3;
tmpNestedPropAssignRhs = d;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, d);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
let a = 1;
let b = {
  set c(x) {
    $('b.set');
    b = null;
    d = null;
    return 7;
  },
};
let d = 3;
tmpNestedPropAssignRhs = d;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, d);
`````

## Result

Should call `$` with:
[['b.set'], [3, null, null], null];

Normalized calls: Same

Final output calls: Same
