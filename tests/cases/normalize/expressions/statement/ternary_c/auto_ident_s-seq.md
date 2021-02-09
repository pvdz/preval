# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > statement > ternary_c > auto_ident_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ($(1), $(2), x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  $(1);
  $(2);
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  $(1);
  $(2);
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
