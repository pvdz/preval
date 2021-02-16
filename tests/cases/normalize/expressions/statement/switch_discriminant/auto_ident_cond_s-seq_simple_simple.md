# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > statement > switch_discriminant > auto_ident_cond_s-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((10, 20, 30) ? $(2) : $($(100))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpSwitchTest = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpSwitchTest = tmpCallCallee(tmpCalleeParam);
}
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
if (30) {
  tmpSwitchTest = $(2);
} else {
  const tmpCalleeParam = $(100);
  tmpSwitchTest = $(tmpCalleeParam);
}
const tmpSwitchValue = tmpSwitchTest;
const tmpIfTest$1 = 0 <= 0;
if (tmpIfTest$1) {
  $(100);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
