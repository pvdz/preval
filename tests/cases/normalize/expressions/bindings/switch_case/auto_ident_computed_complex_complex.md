# Preval test case

# auto_ident_computed_complex_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_computed_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 1 };

    let a = $(b)[$("c")];
    $(a, b);
}
`````

## Normalized

`````js filename=intro
let b;
let tmpCompObj;
let tmpCompProp;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { c: 1 };
  tmpCompObj = $(b);
  tmpCompProp = $('c');
  a = tmpCompObj[tmpCompProp];
  $(a, b);
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === 1;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const b = { c: 1 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('c');
  const a = tmpCompObj[tmpCompProp];
  $(a, b);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
