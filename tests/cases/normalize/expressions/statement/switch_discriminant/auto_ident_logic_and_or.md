# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch (($($(1)) && $($(1))) || $($(2))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = ($($(1)) && $($(1))) || $($(2));
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
} else {
}
if (tmpSwitchDisc) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpSwitchDisc = tmpCallCallee$3(tmpCalleeParam$3);
}
$(100);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpSwitchDisc = $(tmpCalleeParam);
if (tmpSwitchDisc) {
  const tmpCalleeParam$1 = $(1);
  tmpSwitchDisc = $(tmpCalleeParam$1);
} else {
}
if (tmpSwitchDisc) {
} else {
  const tmpCalleeParam$3 = $(2);
  $(tmpCalleeParam$3);
}
$(100);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  $( d );
}
$( 100 );
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
