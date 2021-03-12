# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident new prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((a = new b.$(1))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = (a = new b.$(1));
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(100);
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let tmpSwitchValue = a;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = b.$;
const SSA_a = new tmpNewCallee(1);
$(100);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
