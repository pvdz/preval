# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident new computed s-seq simple
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
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  b = { $: $ };
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  $(a);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpNewCallee = b.$;
const a = new tmpNewCallee(1);
$(a);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
