# Preval test case

# auto_ident_cond_complex_simple_simple.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_cond_complex_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $(1) ? 2 : $($(100));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = undefined;
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      a = 2;
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
  {
    let a = undefined;
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      a = 2;
    } else {
      const tmpCalleeParam = $(100);
      a = $(tmpCalleeParam);
    }
    $(a);
  }
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same