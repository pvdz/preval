# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = new ($($))($(1), $(2))):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
$(a);
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const SSA_a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpIfTest = SSA_a === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchCaseToStart <= 0;
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 'fail1'
 - 7: 'fail2'
 - 8: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
