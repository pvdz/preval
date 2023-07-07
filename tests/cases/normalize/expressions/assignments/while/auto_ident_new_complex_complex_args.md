# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > While > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new ($($))($(1), $(2)))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = new ($($))($(1), $(2)))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
$(100);
const tmpNewCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$4 = $(2);
new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
$(100);
const tmpNewCallee$2 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
new tmpNewCallee$2(tmpCalleeParam$3, tmpCalleeParam$5);
$(100);
const tmpNewCallee$3 = $($);
const tmpCalleeParam$6 = $(1);
const tmpCalleeParam$8 = $(2);
new tmpNewCallee$3(tmpCalleeParam$6, tmpCalleeParam$8);
$(100);
const tmpNewCallee$4 = $($);
const tmpCalleeParam$7 = $(1);
const tmpCalleeParam$9 = $(2);
new tmpNewCallee$4(tmpCalleeParam$7, tmpCalleeParam$9);
$(100);
const tmpNewCallee$5 = $($);
const tmpCalleeParam$10 = $(1);
const tmpCalleeParam$12 = $(2);
new tmpNewCallee$5(tmpCalleeParam$10, tmpCalleeParam$12);
$(100);
const tmpNewCallee$6 = $($);
const tmpCalleeParam$11 = $(1);
const tmpCalleeParam$13 = $(2);
new tmpNewCallee$6(tmpCalleeParam$11, tmpCalleeParam$13);
$(100);
const tmpNewCallee$7 = $($);
const tmpCalleeParam$14 = $(1);
const tmpCalleeParam$16 = $(2);
new tmpNewCallee$7(tmpCalleeParam$14, tmpCalleeParam$16);
$(100);
const tmpNewCallee$8 = $($);
const tmpCalleeParam$15 = $(1);
const tmpCalleeParam$17 = $(2);
new tmpNewCallee$8(tmpCalleeParam$15, tmpCalleeParam$17);
$(100);
const tmpNewCallee$9 = $($);
const tmpCalleeParam$18 = $(1);
const tmpCalleeParam$20 = $(2);
new tmpNewCallee$9(tmpCalleeParam$18, tmpCalleeParam$20);
$(100);
const tmpNewCallee$10 = $($);
const tmpCalleeParam$19 = $(1);
const tmpCalleeParam$21 = $(2);
let a = new tmpNewCallee$10(tmpCalleeParam$19, tmpCalleeParam$21);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpNewCallee$11 = $($);
  const tmpCalleeParam$22 = $(1);
  const tmpCalleeParam$24 = $(2);
  a = new tmpNewCallee$11(tmpCalleeParam$22, tmpCalleeParam$24);
  $(100);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 100
 - 6: '<$>'
 - 7: 1
 - 8: 2
 - 9: 1, 2
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 2
 - 14: 1, 2
 - 15: 100
 - 16: '<$>'
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: '<$>'
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
