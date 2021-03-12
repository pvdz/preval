# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (10, 20, $(30)) ? $(2) : $($(100))):
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(2);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
const tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchCaseToStart <= 0;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 2
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
