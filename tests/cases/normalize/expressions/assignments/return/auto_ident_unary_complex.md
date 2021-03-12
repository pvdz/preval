# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = typeof $(x));
}
$(f());
$(a, x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = typeof $(x));
};
let x = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
  let tmpReturnArg = a;
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
const f = function () {
  const tmpUnaryArg = $(1);
  a = typeof tmpUnaryArg;
  const tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
