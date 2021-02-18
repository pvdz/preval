# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_logic_||_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 0 || $($(1));
    $(a);
}
`````

## Normalized

`````js filename=intro
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  a = 0;
  if (a) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    a = tmpCallCallee(tmpCalleeParam);
  }
  $(a);
}
`````

## Output

`````js filename=intro
let a;
let SSA_a = 0;
if (SSA_a) {
} else {
  const tmpCalleeParam = $(1);
  SSA_a = $(tmpCalleeParam);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
