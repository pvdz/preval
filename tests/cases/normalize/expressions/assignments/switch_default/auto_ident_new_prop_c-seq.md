# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Assignments > Switch default > Auto ident new prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new (1, 2, $(b)).$(1);
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
$(1);
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const SSA_a = new tmpNewCallee(1);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
