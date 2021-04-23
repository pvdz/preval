# Preval test case

# ssa_problem2.md

> Closures > Ssa problem2
>
> Trying to come up with ssa problem cases regarding closures

#TODO

## Input

`````js filename=intro
let f = function () {
  debugger;
  a = 2;
  return undefined;
};
let a = 1;
$(a);
f();
a = 3;
$(a);
f();
$(a);
a = 4;
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  a = 2;
  return undefined;
};
let a = 1;
$(a);
f();
a = 3;
$(a);
f();
$(a);
a = 4;
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = 2;
  return undefined;
};
let a = 1;
$(a);
f();
a = 3;
$(a);
f();
$(a);
a = 4;
`````

## Output

`````js filename=intro
let a = 1;
const f = function () {
  debugger;
  a = 2;
  return undefined;
};
$(a);
f();
a = 3;
$(a);
f();
$(a);
a = 4;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
