# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_unary_tilde_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = { a: 999, b: 1000 };
  a = ~arg;
  $(a, arg);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let arg = 1;
  let a = { a: 999, b: 1000 };
  a = ~arg;
  $(a, arg);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let arg = 1;
  let a = { a: 999, b: 1000 };
  a = ~arg;
  $(a, arg);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: -2, 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
