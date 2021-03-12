# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = typeof arg;
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  a = typeof arg;
}
$(a, arg);
`````

## Output

`````js filename=intro
$(1);
$('number', 1);
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
