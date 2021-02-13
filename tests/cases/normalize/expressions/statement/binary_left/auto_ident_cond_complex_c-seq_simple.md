# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > statement > binary_left > auto_ident_cond_complex_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? (40, 50, $(60)) : $($(100))) + $(100);
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
$(100);
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
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same