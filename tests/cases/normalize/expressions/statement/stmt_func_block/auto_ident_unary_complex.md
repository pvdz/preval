# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > stmt_func_block > auto_ident_unary_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = { a: 999, b: 1000 };
    typeof $(x);
    $(a, x);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let x = 1;
    let a = { a: 999, b: 1000 };
    const tmpUnaryArg = $(x);
    typeof tmpUnaryArg;
    $(a, x);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  {
    let x = 1;
    let a = { a: 999, b: 1000 };
    const tmpUnaryArg = $(x);
    typeof tmpUnaryArg;
    $(a, x);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
