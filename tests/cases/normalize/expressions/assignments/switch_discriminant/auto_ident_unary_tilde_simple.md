# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ((a = ~arg)) {
  default:
    $(100);
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = ~arg;
let tmpSwitchTest = a;
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a, arg);
`````

## Output

`````js filename=intro
$(100);
$(-2, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -2, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
