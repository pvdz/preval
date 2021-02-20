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
  set c(x) { $('set'); },
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
  set c(x) {
    $('set');
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
const b = {
  get c() {
    $('should not be called');
  },
  set c(x) {
    $('set');
  },
};
b.c = 3;
$(3, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'set'
 - 2: 3, { c: '<get/set>' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
