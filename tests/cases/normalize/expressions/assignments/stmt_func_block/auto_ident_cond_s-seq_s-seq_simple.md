# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = (10, 20, 30) ? (40, 50, 60) : $($(100));
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
    10;
    20;
    const tmpIfTest = 30;
    if (tmpIfTest) {
      40;
      50;
      a = 60;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      a = tmpCallCallee(tmpCalleeParam);
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
  a = 60;
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 60
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
