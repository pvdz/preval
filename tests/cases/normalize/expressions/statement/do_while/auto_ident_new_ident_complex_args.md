# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > Do while > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (new $($(1), $(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = new $($(1), $(2));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  tmpDoWhileFlag = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
}
$(a);
`````

## Output

`````js filename=intro
$(100);
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCalleeParam$22 = $(1);
  const tmpCalleeParam$24 = $(2);
  new $(tmpCalleeParam$22, tmpCalleeParam$24);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 1, 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 1, 2
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
