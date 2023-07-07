# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident new computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = new ($(b)["$"])(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = new ($(b)[`\$`])(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  tmpIfTest = $(1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
const b = { $: $ };
while (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  tmpIfTest = $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: 1
 - 7: 1
 - 8: { $: '"<$>"' }
 - 9: 1
 - 10: 1
 - 11: { $: '"<$>"' }
 - 12: 1
 - 13: 1
 - 14: { $: '"<$>"' }
 - 15: 1
 - 16: 1
 - 17: { $: '"<$>"' }
 - 18: 1
 - 19: 1
 - 20: { $: '"<$>"' }
 - 21: 1
 - 22: 1
 - 23: { $: '"<$>"' }
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
