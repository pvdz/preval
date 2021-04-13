# Preval test case

# var_for_of_func_block.md

> Normalize > Hoisting > Base > Var for of func block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var x of [100]) $(x, 'for');
  }
  $(x);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  {
    for (x of [100]) $(x, 'for');
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  const tmpForOfRhs = [100];
  for (x of tmpForOfRhs) {
    $(x, 'for');
  }
  $(x);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
let x = undefined;
$(x);
const tmpForOfRhs = [100];
for (x of tmpForOfRhs) {
  $(x, 'for');
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
