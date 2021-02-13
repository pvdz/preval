# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > statement > stmt_func_block > auto_ident_unary_void_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = { a: 999, b: 1000 };
    void arg;
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let arg = 1;
    let a = { a: 999, b: 1000 };
    undefined;
    $(a, arg);
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
    let arg = 1;
    let a = { a: 999, b: 1000 };
    undefined;
    $(a, arg);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
