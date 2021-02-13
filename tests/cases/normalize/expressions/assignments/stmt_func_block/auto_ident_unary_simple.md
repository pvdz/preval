# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_unary_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = { a: 999, b: 1000 };
    a = typeof x;
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
    a = typeof x;
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
    a = typeof x;
    $(a, x);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'number', 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same