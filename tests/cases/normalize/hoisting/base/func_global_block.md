# Preval test case

# func_global_block.md

> Normalize > Hoisting > Base > Func global block
>
> Function declarations in a block are not hoisted

#TODO

## Input

`````js filename=intro
{
  let x = 100;
  function f() {
    return x;
  }
  $(f());
}
`````

## Pre Normal

`````js filename=intro
{
  let f = function () {
    debugger;
    return x;
  };
  let x = 100;
  $(f());
}
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  return x;
};
let x = 100;
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
