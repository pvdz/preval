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
    get c()  { $('should not be called'); }, 
};
let d = 3;
// This should _NOT_ crash. The getter is not invoked.
a = b.c = d;
$(a, b, d);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
let a = 1;
let b = {
  get c() {
    $('should not be called');
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
  get c() {
    $('should not be called');
  },
};
tmpNestedPropAssignRhs = 3;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3,{},3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
