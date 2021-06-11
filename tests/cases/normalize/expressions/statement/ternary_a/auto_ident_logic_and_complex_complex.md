# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Ternary a > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(2)) ? $(100) : $(200);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(2)) ? $(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpIfTest) {
    $(100);
  } else {
    $(200);
  }
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(2);
  const tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    $(100);
  } else {
    $(200);
  }
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
