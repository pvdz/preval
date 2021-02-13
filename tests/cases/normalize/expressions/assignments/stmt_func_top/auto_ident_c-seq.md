# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;

  let a = { a: 999, b: 1000 };
  a = ($(1), $(2), $(x));
  $(a, x);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let x = 1;
  let a = { a: 999, b: 1000 };
  $(1);
  $(2);
  a = $(x);
  $(a, x);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let x = 1;
  let a = { a: 999, b: 1000 };
  $(1);
  $(2);
  a = $(x);
  $(a, x);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1, 1
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same