# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(0)) || 2) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpSwitchTest = tmpCallCallee(tmpCalleeParam);
if (tmpSwitchTest) {
} else {
  tmpSwitchTest = 2;
}
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
$(tmpCalleeParam);
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
