# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Switch default > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = "foo";
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  a = 'foo';
}
$(a);
`````

## Output

`````js filename=intro
$(1);
$('foo');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
