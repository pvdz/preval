# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident delete computed simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = delete arg["y"];
    $(a, arg);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let arg = { y: 1 };
    let a = delete arg['y'];
    $(a, arg);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let arg = { y: 1 };
  let a = delete arg.y;
  $(a, arg);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const arg = { y: 1 };
  const a = delete arg.y;
  $(a, arg);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
