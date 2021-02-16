# Preval test case

# auto_ident_unary_tilde_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_unary_tilde_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = ~$(100);
    $(a);
}
`````

## Normalized

`````js filename=intro
let tmpUnaryArg;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  tmpUnaryArg = $(100);
  a = ~tmpUnaryArg;
  $(a);
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 1;
tmpSwitchCaseToStart = 0;
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpUnaryArg = $(100);
  const a = ~tmpUnaryArg;
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -101
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
