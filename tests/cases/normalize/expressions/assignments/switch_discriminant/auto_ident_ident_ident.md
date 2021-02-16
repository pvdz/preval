# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
switch ((a = b = 2)) {
  default:
    $(100);
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpSwitchTest = a;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpSwitchTest = a;
$(100);
$(a, b, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
