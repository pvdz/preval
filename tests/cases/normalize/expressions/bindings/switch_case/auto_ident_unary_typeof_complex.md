# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_unary_typeof_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = 1;

    let a = typeof $(arg);
    $(a, arg);
}
`````

## Normalized

`````js filename=intro
let arg;
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
  arg = 1;
  tmpUnaryArg = $(arg);
  a = typeof tmpUnaryArg;
  $(a, arg);
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
