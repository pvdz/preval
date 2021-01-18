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
    get c()  { $('b.get'); b = null; d = null; return 5; }, 
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
let a = 1;
let b = {
  get c() {
    $('b.get');
    b = null;
    d = null;
    return 5;
  },
  set c(x) {
    $('b.set');
    b = null;
    d = null;
    return 7;
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
    $('b.get');
    b = null;
    d = null;
    return 5;
  },
  set c(x) {
    $('b.set');
    b = null;
    d = null;
    return 7;
  },
};
let d = 3;
b.c = d;
a = d;
$(a, b, d);
`````

## Result

Should call `$` with:
[['b.set'], [3, null, null], null];

Normalized calls: BAD?!
[['b.set'], [null, null, null], null];

Final output calls: BAD!!
[['b.set'], [null, null, null], null];

