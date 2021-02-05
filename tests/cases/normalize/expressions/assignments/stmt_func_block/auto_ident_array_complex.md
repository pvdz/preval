# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = [$(1), 2, $(3)];
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
    const tmpArrElement = $(1);
    const tmpArrElement$1 = 2;
    const tmpArrElement$2 = $(3);
    a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
    $(a);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  const tmpArrElement = $(1);
  const tmpArrElement$2 = $(3);
  a = [tmpArrElement, 2, tmpArrElement$2];
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
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
