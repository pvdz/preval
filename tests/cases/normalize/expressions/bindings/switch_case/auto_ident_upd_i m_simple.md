# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident upd i m simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = b--;
    $(a, b);
}
`````

## Normalized

`````js filename=intro
let b;
let tmpPostUpdArgIdent;
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
  tmpPostUpdArgIdent = b;
  b = b - 1;
  a = tmpPostUpdArgIdent;
  $(a, b);
}
`````

## Output

`````js filename=intro
$(1, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
