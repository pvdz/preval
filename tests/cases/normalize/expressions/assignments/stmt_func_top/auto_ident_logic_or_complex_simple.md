# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_logic_or_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = $($(0)) || 2;
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
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
  let a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  $(a);
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same