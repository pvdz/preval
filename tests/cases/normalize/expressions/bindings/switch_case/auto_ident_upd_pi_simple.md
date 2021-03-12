# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident upd pi simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = ++b;
    $(a, b);
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = 1;
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  $(a, b);
}
`````

## Output

`````js filename=intro
$(2, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
