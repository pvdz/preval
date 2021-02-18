# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> normalize > expressions > statement > logic_or_both > auto_ident_cond_s-seq_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, 30) ? (40, 50, $(60)) : $($(100))) ||
  ((10, 20, 30) ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
}
if (tmpIfTest) {
} else {
  const tmpIfTest$2 = 30;
  if (tmpIfTest$2) {
    $(60);
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    tmpCallCallee$1(tmpCalleeParam$1);
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const SSA_tmpIfTest = $(60);
if (SSA_tmpIfTest) {
} else {
  $(60);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
