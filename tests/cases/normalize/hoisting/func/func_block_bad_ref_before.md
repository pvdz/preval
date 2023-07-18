# Preval test case

# func_block_bad_ref_before.md

> Normalize > Hoisting > Func > Func block bad ref before
>
> Block hoisting func decls

It shouldn't hoist the function outside the block.

#TODO

## Input

`````js filename=intro
function g() {
  f(); // This ought to trigger TDZ (or whatever)...
  {
    function f(){ $(1); }
  }
}
g();
`````

## Pre Normal

`````js filename=intro
let g = function () {
  debugger;
  f();
  {
    let f$1 = function () {
      debugger;
      $(1);
    };
  }
};
g();
`````

## Normalized

`````js filename=intro
let g = function () {
  debugger;
  f();
  let f$1 = function () {
    debugger;
    $(1);
    return undefined;
  };
  return undefined;
};
g();
`````

## Output

`````js filename=intro
f();
`````

## PST Output

With rename=true

`````js filename=intro
f();
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
