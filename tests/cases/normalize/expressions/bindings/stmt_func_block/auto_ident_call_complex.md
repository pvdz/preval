# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident call complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $($)(1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = $($)(1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $($);
  let a = tmpCallCallee(1);
  $(a);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam = f();
tmpCallCallee$1(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCallCallee = $($);
  const a = tmpCallCallee(1);
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
