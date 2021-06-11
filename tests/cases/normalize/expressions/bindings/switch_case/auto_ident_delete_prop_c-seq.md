# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto ident delete prop c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete ($(1), $(2), $(arg)).y;
    $(a, arg);
}
`````

## Pre Normal

`````js filename=intro
{
  let arg;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      arg = { y: 1 };
      a = delete ($(1), $(2), $(arg)).y;
      $(a, arg);
    }
  }
}
`````

## Normalized

`````js filename=intro
let arg = undefined;
let a = undefined;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  $(a, arg);
} else {
}
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpClusterSSA_arg = { y: 1 };
const tmpDeleteObj = $(tmpClusterSSA_arg);
const tmpClusterSSA_a = delete tmpDeleteObj.y;
$(tmpClusterSSA_a, tmpClusterSSA_arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
