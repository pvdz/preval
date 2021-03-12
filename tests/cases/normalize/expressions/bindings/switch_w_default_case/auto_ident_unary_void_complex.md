# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident unary void complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = void $(100);
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
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
  $(100);
  a = undefined;
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
$(100);
$(undefined);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
