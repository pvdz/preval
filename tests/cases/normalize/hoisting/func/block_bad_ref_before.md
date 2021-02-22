# Preval test case

# block_bad_ref_before.md

> Normalize > Hoisting > Func > Block bad ref before
>
> Block hoisting func decls

It shouldn't hoist the function outside the block.

#TODO

## Input

`````js filename=intro
f(); // This ought to trigger TDZ (or whatever)...
{
  function f(){ $(1); }
}
`````

## Normalized

`````js filename=intro
f();
let f$1 = function () {
  $(1);
};
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

Normalized calls: Same

Final output calls: Same
