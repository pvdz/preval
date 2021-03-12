# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (10, 20, 30) ? (40, 50, 60) : $($(100))):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  a = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$2 = 2 === tmpSwitchTest;
  if (tmpIfTest$2) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$4) {
  $('fail1');
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$5) {
  $('fail2');
}
$(a);
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 60 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$2 = 2 === tmpSwitchTest;
  if (tmpIfTest$2) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchCaseToStart <= 0;
const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$4) {
  $('fail1');
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$5) {
  $('fail2');
}
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
