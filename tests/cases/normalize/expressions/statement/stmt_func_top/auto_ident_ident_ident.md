# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > statement > stmt_func_top > auto_ident_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = 1,
    c = 2;

  let a = { a: 999, b: 1000 };
  b = 2;
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = 1;
  let c = 2;
  let a = { a: 999, b: 1000 };
  b = 2;
  $(a, b, c);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = 1;
  const a = { a: 999, b: 1000 };
  b = 2;
  $(a, b, 2);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2, 2
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
