# Preval test case

# func_block_bad_ref_after.md

> Normalize > Hoisting > Func > Func block bad ref after
>
> Block hoisting func decls

In strict mode the funcdecl is a hoisted lexical binding, not a var binding.

#TODO

## Input

`````js filename=intro
function g() {
  {
    function f(){ $(1); } // this is let f = function(){}
  }
  f(); // Fails in strict mode (would be fine otherwise)
}
g();
`````

## Pre Normal

`````js filename=intro
let g = function () {
  debugger;
  {
    let f$1 = function () {
      debugger;
      $(1);
    };
  }
  f();
};
g();
`````

## Normalized

`````js filename=intro
let g = function () {
  debugger;
  let f$1 = function () {
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
