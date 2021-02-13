# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_logic_||_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = 0 || $($(1));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = 0;
  if (a) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
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
  let a = 0;
  if (a) {
  } else {
    const tmpCalleeParam = $(1);
    a = $(tmpCalleeParam);
  }
  $(a);
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same