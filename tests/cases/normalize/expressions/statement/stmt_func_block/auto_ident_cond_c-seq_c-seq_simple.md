# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> normalize > expressions > statement > stmt_func_block > auto_ident_cond_c-seq_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
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
    const tmpIfTest = $(30);
    if (tmpIfTest) {
      $(60);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpCallCallee(tmpCalleeParam);
    }
    $(a);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
