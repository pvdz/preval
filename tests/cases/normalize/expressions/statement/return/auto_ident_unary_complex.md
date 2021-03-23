# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Return > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return typeof $(x);
}
$(f());
$(a, x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return typeof $(x);
};
let x = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpUnaryArg = $(x);
  const tmpReturnArg = typeof tmpUnaryArg;
  return tmpReturnArg;
};
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(1);
const tmpReturnArg = typeof tmpUnaryArg;
$(tmpReturnArg);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
