# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> normalize > expressions > statement > logic_or_both > auto_ident_cond_simple_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? (40, 50, 60) : $($(100))) || (1 ? (40, 50, 60) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
if (1) {
  40;
  50;
  tmpIfTest = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
}
if (tmpIfTest) {
} else {
  if (1) {
    40;
    50;
    60;
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
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
tmpIfTest = 60;
if (tmpIfTest) {
} else {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
