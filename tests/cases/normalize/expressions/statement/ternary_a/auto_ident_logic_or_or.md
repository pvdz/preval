# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > ternary_a > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0)) || $($(1)) || $($(2)) ? $(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
}
if (tmpIfTest) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpIfTest = tmpCallCallee$2(tmpCalleeParam$2);
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
const tmpCalleeParam = $(0);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
}
if (tmpIfTest) {
} else {
  const tmpCalleeParam$2 = $(2);
  tmpIfTest = $(tmpCalleeParam$2);
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same