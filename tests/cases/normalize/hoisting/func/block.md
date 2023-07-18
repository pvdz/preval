# Preval test case

# block.md

> Normalize > Hoisting > Func > Block
>
> Block hoisting func decls

At some point the block would be dropped but the function wouldn't be hoisted

#TODO

## Input

`````js filename=intro
{
  f(); // Should be ok
  function f(){ $(1); } // this is let f = function(){}
}
`````

## Pre Normal

`````js filename=intro
{
  let f = function () {
    debugger;
    $(1);
  };
  f();
}
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
