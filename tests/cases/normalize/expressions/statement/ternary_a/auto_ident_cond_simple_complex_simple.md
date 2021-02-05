# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > statement > ternary_a > auto_ident_cond_simple_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? $(2) : $($(100))) ? $(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
if (1) {
  tmpIfTest = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
tmpIfTest = $(2);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
