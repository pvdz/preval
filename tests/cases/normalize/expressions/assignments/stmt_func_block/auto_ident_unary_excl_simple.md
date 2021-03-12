# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = { a: 999, b: 1000 };
    a = !arg;
    $(a, arg);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let arg = 1;
    let a = { a: 999, b: 1000 };
    a = !arg;
    $(a, arg);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let arg = 1;
  let a = { a: 999, b: 1000 };
  a = !arg;
  $(a, arg);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(false, 1);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
