# Preval test case

# ident_simple.md

> Normalize > Binding > Case-block > Ident simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { case $('a'): let a = b; break; }
$(a, b, c);
`````

## Settled


`````js filename=intro
$(`a`);
$(`a`);
$(1, 2, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
$(`a`);
$(1, 2, 3);
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
    a$1 = b;
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
    a$1 = b;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "a" );
$( "a" );
$( 1, 2, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
