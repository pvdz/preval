# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_logic_or_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || 2;
    $(a);
}
`````

## Normalized

`````js filename=intro
let tmpCallCallee;
let tmpCalleeParam;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  tmpCallCallee = $;
  tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  $(a);
}
`````

## Output

`````js filename=intro
let a;
const tmpCalleeParam = $(0);
let SSA_a = $(tmpCalleeParam);
if (SSA_a) {
} else {
  SSA_a = 2;
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
