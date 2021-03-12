# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident new computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new (1, 2, b)["$"](1);
    $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let b;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      b = { $ };
      a = new (1, 2, b)['$'](1);
      $(a);
    }
  }
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { $: $ };
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  $(a);
}
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = b.$;
const a = new tmpNewCallee(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
