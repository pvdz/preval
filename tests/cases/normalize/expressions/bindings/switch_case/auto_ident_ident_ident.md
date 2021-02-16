# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > bindings > switch_case > auto_ident_ident_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1,
      c = 2;

    let a = (b = 2);
    $(a, b, c);
}
`````

## Normalized

`````js filename=intro
let b;
let c;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = 1;
  c = 2;
  b = 2;
  a = b;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
let b;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === 1;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = 1;
  const c = 2;
  b = 2;
  const a = b;
  $(a, b, c);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
