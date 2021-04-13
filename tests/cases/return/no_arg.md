# Preval test case

# no_arg.md

> Return > No arg
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  return;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
