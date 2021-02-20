# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = b--);
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  a = tmpPostUpdArgIdent;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f() {
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  a = tmpPostUpdArgIdent;
  const tmpReturnArg = a;
  return tmpReturnArg;
}
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
