# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Statement > Return > Auto ident unary minus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return -$(100);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpUnaryArg = $(100);
  const tmpReturnArg = -tmpUnaryArg;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpUnaryArg = $(100);
  const tmpReturnArg = -tmpUnaryArg;
  return tmpReturnArg;
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
