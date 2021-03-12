# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { x: 1, y: 2, z: 3 };
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = { x: 1, y: 2, z: 3 };
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { x: 1, y: 2, z: 3 };
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { x: 1, y: 2, z: 3 };
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
