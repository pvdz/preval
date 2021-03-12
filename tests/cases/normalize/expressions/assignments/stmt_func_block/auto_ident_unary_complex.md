# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = { a: 999, b: 1000 };
    a = typeof $(x);
    $(a, x);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let x = 1;
    let a = { a: 999, b: 1000 };
    a = typeof $(x);
    $(a, x);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = 1;
  let a = { a: 999, b: 1000 };
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
  $(a, x);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpUnaryArg = $(1);
  const SSA_a = typeof tmpUnaryArg;
  $(SSA_a, 1);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
