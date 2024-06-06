# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = (1, 2, $(b)).$(1);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = (1, 2, $(b)).$(1);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCallObj = $(b);
  a = tmpCallObj.$(1);
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const b = { $: $ };
  const tmpCallObj = $(b);
  const tmpClusterSSA_a = tmpCallObj.$(1);
  $(tmpClusterSSA_a);
} else {
  const a = { a: 999, b: 1000 };
  $(a);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = { $: $ };
  const e = $( d );
  const f = e.$( 1 );
  $( f );
}
else {
  const g = {
a: 999,
b: 1000
  ;
  $( g );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
