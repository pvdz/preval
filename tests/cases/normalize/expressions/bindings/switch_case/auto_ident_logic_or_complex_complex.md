# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident logic or complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || $($(2));
    $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = $($(0)) || $($(2));
      $(a);
    }
  }
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
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  $(a);
}
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let SSA_a = $(tmpCalleeParam);
if (SSA_a) {
} else {
  const tmpCalleeParam$1 = $(2);
  SSA_a = $(tmpCalleeParam$1);
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
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
