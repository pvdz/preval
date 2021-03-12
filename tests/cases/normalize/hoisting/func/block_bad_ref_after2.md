# Preval test case

# block_bad_ref_after2.md

> Normalize > Hoisting > Func > Block bad ref after2
>
> Block hoisting func decls

In strict mode the funcdecl is a hoisted lexical binding, not a var binding.

#TODO

## Input

`````js filename=intro
{
  f(); // ok
  function f(){ $(1); } // this is let f = function(){}
}
f(); // Fails in strict mode (would be fine otherwise)
`````

## Normalized

`````js filename=intro
let f = function () {
  $(1);
};
f();
f$1();
`````

## Output

`````js filename=intro
$(1);
f$1();
`````

## Globals

BAD@! Found 1 implicit global bindings:

f$1

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
