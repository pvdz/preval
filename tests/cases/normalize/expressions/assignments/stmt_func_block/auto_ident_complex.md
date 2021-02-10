# Preval test case

# auto_ident_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = { a: 999, b: 1000 };
    a = $(b);
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = 1;
    let a = { a: 999, b: 1000 };
    a = $(b);
    $(a, b);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
