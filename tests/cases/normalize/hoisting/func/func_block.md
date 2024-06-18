# Preval test case

# func_block.md

> Normalize > Hoisting > Func > Func block
>
> Block hoisting func decls

At some point the block would be dropped but the function wouldn't be hoisted

## Input

`````js filename=intro
function g() {
  {
    f(); // Should be ok
    function f(){ $(1); }
  }
}
g();
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  {
    let f = function () {
      debugger;
      $(1);
    };
    f();
  }
};
g();
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    $(1);
    return undefined;
  };
  f();
  return undefined;
};
g();
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
