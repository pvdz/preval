# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Statement > For b > Auto ident new prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; new (1, 2, $(b)).$(1); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (new (1, 2, $(b)).$(1)) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  const tmpIfTest = new tmpNewCallee(1);
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
new tmpNewCallee(1);
$(1);
const tmpCompObj$1 = $(b);
const tmpNewCallee$1 = tmpCompObj$1.$;
new tmpNewCallee$1(1);
$(1);
const tmpCompObj$2 = $(b);
const tmpNewCallee$2 = tmpCompObj$2.$;
new tmpNewCallee$2(1);
$(1);
const tmpCompObj$3 = $(b);
const tmpNewCallee$3 = tmpCompObj$3.$;
new tmpNewCallee$3(1);
$(1);
const tmpCompObj$4 = $(b);
const tmpNewCallee$4 = tmpCompObj$4.$;
new tmpNewCallee$4(1);
$(1);
const tmpCompObj$5 = $(b);
const tmpNewCallee$5 = tmpCompObj$5.$;
new tmpNewCallee$5(1);
$(1);
const tmpCompObj$6 = $(b);
const tmpNewCallee$6 = tmpCompObj$6.$;
new tmpNewCallee$6(1);
$(1);
const tmpCompObj$7 = $(b);
const tmpNewCallee$7 = tmpCompObj$7.$;
new tmpNewCallee$7(1);
$(1);
const tmpCompObj$8 = $(b);
const tmpNewCallee$8 = tmpCompObj$8.$;
new tmpNewCallee$8(1);
$(1);
const tmpCompObj$9 = $(b);
const tmpNewCallee$9 = tmpCompObj$9.$;
new tmpNewCallee$9(1);
$(1);
const tmpCompObj$10 = $(b);
const tmpNewCallee$10 = tmpCompObj$10.$;
new tmpNewCallee$10(1);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompObj$11 = $(b);
  const tmpNewCallee$11 = tmpCompObj$11.$;
  new tmpNewCallee$11(1);
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - 4: { $: '"<$>"' }
 - 5: 1
 - 6: 1
 - 7: { $: '"<$>"' }
 - 8: 1
 - 9: 1
 - 10: { $: '"<$>"' }
 - 11: 1
 - 12: 1
 - 13: { $: '"<$>"' }
 - 14: 1
 - 15: 1
 - 16: { $: '"<$>"' }
 - 17: 1
 - 18: 1
 - 19: { $: '"<$>"' }
 - 20: 1
 - 21: 1
 - 22: { $: '"<$>"' }
 - 23: 1
 - 24: 1
 - 25: { $: '"<$>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
