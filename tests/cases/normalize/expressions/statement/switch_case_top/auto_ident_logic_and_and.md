# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Switch case top > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $($(1)) && $($(1)) && $($(2));
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    $($(1)) && $($(1)) && $($(2));
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest$1) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpCallCallee$3(tmpCalleeParam$3);
    } else {
    }
  } else {
  }
} else {
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam = $(1);
  const tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = $(1);
    const tmpClusterSSA_tmpIfTest$1 = $(tmpCalleeParam$1);
    if (tmpClusterSSA_tmpIfTest$1) {
      const tmpCalleeParam$3 = $(2);
      $(tmpCalleeParam$3);
    } else {
    }
  } else {
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = $( 1 );
const d = b === c;
if (d) {
  const e = $( 1 );
  const f = $( e );
  if (f) {
    const g = $( 1 );
    const h = $( g );
    if (h) {
      const i = $( 2 );
      $( i );
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
