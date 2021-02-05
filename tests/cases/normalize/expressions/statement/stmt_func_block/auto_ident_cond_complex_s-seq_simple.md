# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> normalize > expressions > statement > stmt_func_block > auto_ident_cond_complex_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $(1) ? (40, 50, 60) : $($(100));
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
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      40;
      50;
      60;
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
function f() {
  let a = { a: 999, b: 1000 };
  const tmpIfTest = $(1);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpCallCallee(tmpCalleeParam);
  }
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
