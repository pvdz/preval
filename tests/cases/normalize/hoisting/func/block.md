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

## Normalized

`````js filename=intro
let f = function () {
  $(1);
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
