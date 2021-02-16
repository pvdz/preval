# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > statement > switch_discriminant > auto_ident_cond_simple_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch (1 ? (40, 50, $(60)) : $($(100))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
tmpSwitchTest = $(60);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
tmpSwitchTest = $(60);
const tmpSwitchValue = tmpSwitchTest;
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
