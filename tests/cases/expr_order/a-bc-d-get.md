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
b.c = d;
a = d;
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

## Result

Should call `$` with:
[[3, {}, 3], null];

Normalized calls: Same

Final output calls: Same
