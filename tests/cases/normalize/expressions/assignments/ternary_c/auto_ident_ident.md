# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > ternary_c > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  a = b;
  tmpCalleeParam = b;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  a = b;
  tmpCalleeParam = b;
}
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same