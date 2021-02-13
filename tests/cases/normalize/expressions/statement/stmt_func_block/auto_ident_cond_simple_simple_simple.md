# Preval test case

# auto_ident_cond_simple_simple_simple.md

> normalize > expressions > statement > stmt_func_block > auto_ident_cond_simple_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    1 ? 2 : $($(100));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $(a);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $(a);
  }
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same