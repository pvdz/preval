# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > For let > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let xyz = (a = new (1, 2, b).$(1)); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
{
  let xyz = (a = new (1, 2, b).$(1));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = b.$;
const SSA_a = new tmpNewCallee(1);
while (true) {
  $(SSA_a);
  $(1);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: 1
 - 4: {}
 - 5: 1
 - 6: {}
 - 7: 1
 - 8: {}
 - 9: 1
 - 10: {}
 - 11: 1
 - 12: {}
 - 13: 1
 - 14: {}
 - 15: 1
 - 16: {}
 - 17: 1
 - 18: {}
 - 19: 1
 - 20: {}
 - 21: 1
 - 22: {}
 - 23: 1
 - 24: {}
 - 25: 1
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
