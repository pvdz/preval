# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> normalize > expressions > assignments > if > auto_ident_cond_complex_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = 60;
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
let tmpIfTest = a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same