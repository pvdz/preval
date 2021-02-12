# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > statement > stmt_func_block > auto_ident_call_ident_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    $($(1), $(2));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { $: $ };
    let a = { a: 999, b: 1000 };
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    $(a);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
function f() {
  {
    let b = { $: $ };
    let a = { a: 999, b: 1000 };
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    $(a);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: { a: '999', b: '1000' }
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
