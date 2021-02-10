# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > statement > stmt_func_block > auto_ident_logic_and_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $($(1)) && $($(2));
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
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    const tmpIfTest = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpCallCallee$1(tmpCalleeParam$1);
    }
    $(a);
  }
}
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
