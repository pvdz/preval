# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident new computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new (1, 2, $(b))["$"](1);
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
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
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      b = { $ };
      a = new (1, 2, $(b))['$'](1);
      $(a);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
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
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  b = { $: $ };
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  $(a);
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $('fail1');
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $('fail2');
}
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const a = new tmpNewCallee(1);
$(a);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: {}
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
