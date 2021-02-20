# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = { a: 999, b: 1000 };
    typeof x;
    $(a, x);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = 1;
  let a = { a: 999, b: 1000 };
  typeof x;
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const a = { a: 999, b: 1000 };
  $(a, 1);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
