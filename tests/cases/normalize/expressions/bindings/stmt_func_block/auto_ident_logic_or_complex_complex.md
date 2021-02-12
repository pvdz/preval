# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_logic_or_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $($(0)) || $($(2));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    let a = tmpCallCallee(tmpCalleeParam);
    if (a) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      a = tmpCallCallee$1(tmpCalleeParam$1);
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
function f() {
  {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    let a = tmpCallCallee(tmpCalleeParam);
    if (a) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      a = tmpCallCallee$1(tmpCalleeParam$1);
    }
    $(a);
  }
}
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
