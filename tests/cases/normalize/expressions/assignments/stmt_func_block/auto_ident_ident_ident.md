# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1,
      c = 2;

    let a = { a: 999, b: 1000 };
    a = b = 2;
    $(a, b, c);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = 1;
    let c = 2;
    let a = { a: 999, b: 1000 };
    b = 2;
    a = 2;
    $(a, b, c);
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
    let b = 1;
    let c = 2;
    let a = { a: 999, b: 1000 };
    b = 2;
    a = 2;
    $(a, b, c);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
