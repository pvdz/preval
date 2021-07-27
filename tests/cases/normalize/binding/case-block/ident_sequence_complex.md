# Preval test case

# ident_sequence_complex.md

> Normalize > Binding > Case-block > Ident sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { case $('a'): let a = ($(b), $(c)); break; }
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = 2,
  c = 3;
{
  let a$1;
  const tmpSwitchValue = $(`a`);
  let tmpSwitchCaseToStart = 1;
  if ($(`a`) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a$1 = ($(b), $(c));
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let a$1 = undefined;
const tmpSwitchValue = $(`a`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $(b);
    a$1 = $(c);
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
const tmpSwitchValue = $(`a`);
const tmpBinLhs = $(`a`);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  $(2);
  $(3);
} else {
}
$(1, 2, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 2
 - 4: 3
 - 5: 1, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
