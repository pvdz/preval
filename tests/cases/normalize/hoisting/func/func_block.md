# Preval test case

# func_block.md

> Normalize > Hoisting > Func > Func block
>
> Block hoisting func decls

At some point the block would be dropped but the function wouldn't be hoisted

#TODO

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

## Normalized

`````js filename=intro
function g() {
  let f = function () {
    $(1);
  };
  f();
}
g();
`````

## Output

`````js filename=intro
function g() {
  const f = function () {
    $(1);
  };
  f();
}
g();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same