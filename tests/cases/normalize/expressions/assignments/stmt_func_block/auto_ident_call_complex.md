# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = $($)(1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    a = $($)(1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $($);
  a = tmpCallCallee(1);
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam = f();
tmpCallCallee$1(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $($);
const a = tmpCallCallee(1);
$(a);
$(undefined);
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
