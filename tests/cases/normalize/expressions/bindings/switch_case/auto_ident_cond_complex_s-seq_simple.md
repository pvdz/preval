# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond complex s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1) ? (40, 50, 60) : $($(100));
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
      a = $(1) ? (40, 50, 60) : $($(100));
      $(a);
    }
  }
}
`````

## Normalized

`````js filename=intro
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
  const tmpIfTest$3 = $(1);
  if (tmpIfTest$3) {
    a = 60;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  $(a);
} else {
}
`````

## Output

`````js filename=intro
let a = 0;
const tmpIfTest$3 = $(1);
if (tmpIfTest$3) {
  a = 60;
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
