# Preval test case

# var_for_in_func_block.md

> Normalize > Hoisting > Base > Var for in func block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  {
    for (var x in {y: 100}) $(x, 'for');
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
    for (x in { y: 100 }) $(x, `for`);
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
  const tmpForInRhs = { y: 100 };
  for (x in tmpForInRhs) {
    $(x, `for`);
  }
  $(x);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
let x = undefined;
$(undefined);
const tmpForInRhs = { y: 100 };
for (x in tmpForInRhs) {
  $(x, `for`);
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'y', 'for'
 - 3: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
