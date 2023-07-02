# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > While > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while (new $($(1), $(2))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (new $($(1), $(2))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
$(100);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$4 = $(2);
new $(tmpCalleeParam$2, tmpCalleeParam$4);
$(100);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
new $(tmpCalleeParam$3, tmpCalleeParam$5);
$(100);
const tmpCalleeParam$6 = $(1);
const tmpCalleeParam$8 = $(2);
new $(tmpCalleeParam$6, tmpCalleeParam$8);
$(100);
const tmpCalleeParam$7 = $(1);
const tmpCalleeParam$9 = $(2);
new $(tmpCalleeParam$7, tmpCalleeParam$9);
$(100);
const tmpCalleeParam$10 = $(1);
const tmpCalleeParam$12 = $(2);
new $(tmpCalleeParam$10, tmpCalleeParam$12);
$(100);
const tmpCalleeParam$11 = $(1);
const tmpCalleeParam$13 = $(2);
new $(tmpCalleeParam$11, tmpCalleeParam$13);
$(100);
const tmpCalleeParam$14 = $(1);
const tmpCalleeParam$16 = $(2);
new $(tmpCalleeParam$14, tmpCalleeParam$16);
$(100);
const tmpCalleeParam$15 = $(1);
const tmpCalleeParam$17 = $(2);
new $(tmpCalleeParam$15, tmpCalleeParam$17);
$(100);
const tmpCalleeParam$18 = $(1);
const tmpCalleeParam$20 = $(2);
new $(tmpCalleeParam$18, tmpCalleeParam$20);
$(100);
const tmpCalleeParam$19 = $(1);
const tmpCalleeParam$21 = $(2);
new $(tmpCalleeParam$19, tmpCalleeParam$21);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam$22 = $(1);
  const tmpCalleeParam$24 = $(2);
  new $(tmpCalleeParam$22, tmpCalleeParam$24);
  $(100);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
