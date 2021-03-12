# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond simple s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = 1 ? (40, 50, 60) : $($(100));
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
      a = 1 ? (40, 50, 60) : $($(100));
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
  a = 60;
  $(a);
}
`````

## Output

`````js filename=intro
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
