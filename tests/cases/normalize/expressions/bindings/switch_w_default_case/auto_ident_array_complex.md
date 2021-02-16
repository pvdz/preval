# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_array_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = [$(1), 2, $(3)];
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
let tmpArrElement;
let tmpArrElement$1;
let tmpArrElement$2;
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
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  tmpArrElement = $(1);
  tmpArrElement$1 = 2;
  tmpArrElement$2 = $(3);
  a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
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
let tmpSwitchCaseToStart = 1;
tmpSwitchCaseToStart = 0;
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  const tmpArrElement = $(1);
  const tmpArrElement$2 = $(3);
  const a = [tmpArrElement, 2, tmpArrElement$2];
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

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
