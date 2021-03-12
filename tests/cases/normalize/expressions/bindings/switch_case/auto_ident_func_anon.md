# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Bindings > Switch case > Auto ident func anon
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = function () {};
    $(a);
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
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  a = function () {};
  $(a);
}
`````

## Output

`````js filename=intro
const a = function () {};
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
