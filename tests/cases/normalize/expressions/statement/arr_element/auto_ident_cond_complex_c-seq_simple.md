# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > statement > arr_element > auto_ident_cond_complex_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? (40, 50, $(60)) : $($(100))) + ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCallCallee(tmpCalleeParam);
}
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(60);
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam = $(100);
  $(tmpCalleeParam);
}
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(60);
} else {
  const tmpCalleeParam$1 = $(100);
  $(tmpCalleeParam$1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 1
 - 4: 60
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same