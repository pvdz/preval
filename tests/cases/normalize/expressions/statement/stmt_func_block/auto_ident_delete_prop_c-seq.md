# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > stmt_func_block > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = { y: 1 };

    let a = { a: 999, b: 1000 };
    delete ($(1), $(2), $(x)).y;
    $(a, x);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let x = { y: 1 };
    let a = { a: 999, b: 1000 };
    $(1);
    $(2);
    const tmpDeleteObj = $(x);
    delete tmpDeleteObj.y;
    $(a, x);
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
 - 2: 2
 - 3: { y: '1' }
 - 4: { a: '999', b: '1000' }, {}
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
