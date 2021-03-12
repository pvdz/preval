# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(0)) || $($(2))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpSwitchTest = tmpCallCallee(tmpCalleeParam);
if (tmpSwitchTest) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpSwitchTest = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
const tmpSwitchTest = $(tmpCalleeParam);
if (tmpSwitchTest) {
} else {
  const tmpCalleeParam$1 = $(2);
  $(tmpCalleeParam$1);
}
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
