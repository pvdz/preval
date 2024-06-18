# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = delete ($(1), $(2), arg).y;
}
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = delete ($(1), $(2), arg).y;
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj = arg;
  a = delete tmpDeleteObj.y;
} else {
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpClusterSSA_a = delete arg.y;
  $(tmpClusterSSA_a, arg);
} else {
  const a = { a: 999, b: 1000 };
  $(a, arg);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( 1 );
const c = $( 1 );
const d = b === c;
if (d) {
  $( 1 );
  $( 2 );
  const e = delete a.y;
  $( e, a );
}
else {
  const f = {
    a: 999,
    b: 1000,
  };
  $( f, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
