# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident unary minus simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = 1;

    let a = -arg;
    $(a, arg);
}
`````

## Normalized

`````js filename=intro
let arg;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  arg = 1;
  a = -arg;
  $(a, arg);
}
`````

## Output

`````js filename=intro
$(-1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
