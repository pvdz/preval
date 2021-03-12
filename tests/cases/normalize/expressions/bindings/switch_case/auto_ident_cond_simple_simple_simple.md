# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond simple simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 1 ? 2 : $($(100));
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
  a = 2;
  $(a);
}
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
