# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > bindings > switch_case > auto_ident_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1;

    let a = ($(1), $(2), x);
    $(a, x);
}
`````

## Normalized

`````js filename=intro
let x;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  x = 1;
  $(1);
  $(2);
  a = x;
  $(a, x);
}
`````

## Output

`````js filename=intro
$(1);
$(2);
$(1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
