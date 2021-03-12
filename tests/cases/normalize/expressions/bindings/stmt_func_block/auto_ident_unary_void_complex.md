# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident unary void complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = void $(100);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = void $(100);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  $(100);
  let a = undefined;
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(100);
  $(undefined);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
