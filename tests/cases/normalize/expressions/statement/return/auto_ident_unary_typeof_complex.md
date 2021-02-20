# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Return > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f() {
  return typeof $(arg);
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpUnaryArg = $(arg);
  const tmpReturnArg = typeof tmpUnaryArg;
  return tmpReturnArg;
}
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
function f() {
  const tmpUnaryArg = $(1);
  const tmpReturnArg = typeof tmpUnaryArg;
  return tmpReturnArg;
}
const a = { a: 999, b: 1000 };
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
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
