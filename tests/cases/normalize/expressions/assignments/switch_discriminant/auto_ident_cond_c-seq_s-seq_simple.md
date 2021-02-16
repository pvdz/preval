# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_cond_c-seq_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpSwitchTest = a;
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
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
let tmpSwitchTest = a;
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 100
 - 3: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
