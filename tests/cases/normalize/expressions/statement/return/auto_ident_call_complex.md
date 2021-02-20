# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > Return > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($)(1);
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $($);
  const tmpReturnArg = tmpCallCallee(1);
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam = f();
tmpCallCallee$1(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  const tmpCallCallee = $($);
  const tmpReturnArg = tmpCallCallee(1);
  return tmpReturnArg;
}
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
