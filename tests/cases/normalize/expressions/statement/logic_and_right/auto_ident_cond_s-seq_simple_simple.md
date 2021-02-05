# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > statement > logic_and_right > auto_ident_cond_s-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && ((10, 20, 30) ? $(2) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  10;
  20;
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    $(2);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpCallCallee(tmpCalleeParam);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(2);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
