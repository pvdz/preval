# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_cond_simple_c-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = 1 ? (40, 50, $(60)) : $($(100));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = undefined;
  if (1) {
    40;
    50;
    a = $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  let a = undefined;
  a = $(60);
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
