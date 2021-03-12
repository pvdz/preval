# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = { a: 999, b: 1000 };
  typeof $(arg);
  $(a, arg);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let arg = 1;
  let a = { a: 999, b: 1000 };
  typeof $(arg);
  $(a, arg);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let arg = 1;
  let a = { a: 999, b: 1000 };
  const tmpUnaryArg = $(arg);
  typeof tmpUnaryArg;
  $(a, arg);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpUnaryArg = $(1);
  typeof tmpUnaryArg;
  $(a, 1);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
