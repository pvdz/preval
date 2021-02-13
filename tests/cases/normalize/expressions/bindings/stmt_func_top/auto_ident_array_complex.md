# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_array_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = [$(1), 2, $(3)];
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$2 = $(3);
  let a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpArrElement = $(1);
  const tmpArrElement$2 = $(3);
  let a = [tmpArrElement, 2, tmpArrElement$2];
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same