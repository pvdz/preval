# Preval test case

# ident_sequence_simple.md

> Normalize > Binding > Case-block > Ident sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { case $('a'): let a = ($(b), c); break; }
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  c = 3;
tmpSwitchBreak: {
  let a$1;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    a$1 = ($(b), c);
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
tmpSwitchBreak: {
  let a$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(b);
    a$1 = c;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(`a`);
const tmpBinBothRhs = $(`a`);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(2);
} else {
}
$(1, 2, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = a === b;
if (c) {
  $( 2 );
}
$( 1, 2, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 2
 - 4: 1, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
