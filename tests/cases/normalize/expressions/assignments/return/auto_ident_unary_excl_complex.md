# Preval test case

# auto_ident_unary_excl_complex.md

> normalize > expressions > assignments > return > auto_ident_unary_excl_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = !$(100));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpUnaryArg = $(100);
  a = !tmpUnaryArg;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  const tmpUnaryArg = $(100);
  a = !tmpUnaryArg;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - 3: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same