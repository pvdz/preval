# Preval test case

# reassign_obj.md

> Object literal > Static prop lookups > Reassign obj
>
> Double check whether this can't be broken

#TODO

## Input

`````js filename=intro
let a = 1;
let b = {
    c()  { b = undefined; },
};
let d = 3;
// This should _NOT_ crash. Despite all attempts to set b to null.
b.c = d;
// b should end up being null, d should end up being null, a should be 3.
$(a, b, d);
`````

## Pre Normal

`````js filename=intro
let a = 1;
let b = {
  c() {
    debugger;
    b = undefined;
  },
};
let d = 3;
b.c = d;
$(a, b, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = {
  c() {
    debugger;
    b = undefined;
    return undefined;
  },
};
let d = 3;
b.c = d;
$(a, b, d);
`````

## Output

`````js filename=intro
let b = {
  c() {
    debugger;
    b = undefined;
    return undefined;
  },
};
b.c = 3;
$(1, b, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { c: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
