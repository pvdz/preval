# Preval test case

# auto_ident_cond_complex_simple_simple.md

> normalize > expressions > assignments > let > auto_ident_cond_complex_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $(1) ? 2 : $($(100)));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
let xyz = a;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same