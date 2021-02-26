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

## Normalized

`````js filename=intro
let g = function () {
  let f = function () {
    $(1);
  };
  f$1();
};
g();
`````

## Output

`````js filename=intro
const g = function () {
  f$1();
};
g();
`````

## Globals

BAD@! Found 1 implicit global bindings:

f$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
