# Preval test case

# var_for_of_func_top.md

> Normalize > Hoisting > Base > Var for of func top
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  for (var x of [100]) $(x, 'for');
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
  for (x of [100]) $(x, `for`);
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
const tmpForOfRhs = [100];
for (x of tmpForOfRhs) {
  $(x, `for`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$( undefined );
const b = [ 100 ];
for (a of b) {
  $( a, "for" );
}
$( a );
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
