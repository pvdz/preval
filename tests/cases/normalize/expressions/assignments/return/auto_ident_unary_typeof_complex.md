# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > assignments > return > auto_ident_unary_typeof_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = typeof $(arg));
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpUnaryArg = $(arg);
  a = typeof tmpUnaryArg;
  let tmpReturnArg = a;
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
  a = typeof tmpUnaryArg;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
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

Normalized calls: Same

Final output calls: Same
