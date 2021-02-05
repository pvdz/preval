# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > statement > arr_element > auto_ident_cond_simple_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? $(2) : $($(100))) + (1 ? $(2) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
if (1) {
  $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCallCallee(tmpCalleeParam);
}
if (1) {
  $(2);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpCallCallee$1(tmpCalleeParam$1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(2);
$(2);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
