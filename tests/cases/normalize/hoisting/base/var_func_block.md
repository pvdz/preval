# Preval test case

# var_func_block.md

> Normalize > Hoisting > Base > Var func block
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
function f() {
  $(x);
  {
    var x = 10;
  }
  $(x);
  return x;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  {
    x = 10;
  }
  $(x);
  return x;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  x = 10;
  $(x);
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
$(10);
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( 10 );
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
