# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = 1;

  let a = { a: 999, b: 1000 };
  a = b--;
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = 1;
  let a = { a: 999, b: 1000 };
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  a = tmpPostUpdArgIdent;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  $(1, 0);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 0
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
