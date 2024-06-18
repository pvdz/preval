# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(1)) && $($(1)) && $($(2))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $($(1)) && $($(1)) && $($(2));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpSwitchDisc = tmpCallCallee(tmpCalleeParam);
if (tmpSwitchDisc) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpSwitchDisc = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpSwitchDisc) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpSwitchDisc = tmpCallCallee$3(tmpCalleeParam$3);
  } else {
  }
} else {
}
$(100);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpSwitchDisc = $(tmpCalleeParam);
if (tmpSwitchDisc) {
  const tmpCalleeParam$1 = $(1);
  const tmpClusterSSA_tmpSwitchDisc = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpSwitchDisc) {
    const tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
  } else {
  }
} else {
}
$(100);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    $( e );
  }
}
$( 100 );
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
