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
let a = 1;
let b = {
  get c() {
    $('should not be called');
  },
};
let d = 3;
const tmpNestedPropAssignRhs = d;
b.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
$(a, b, d);
`````

## Output

`````js filename=intro
let a = 1;
let b = {
  get c() {
    $('should not be called');
  },
};
b.c = 3;
a = 3;
$(a, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3, { c: '<get/set>' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
