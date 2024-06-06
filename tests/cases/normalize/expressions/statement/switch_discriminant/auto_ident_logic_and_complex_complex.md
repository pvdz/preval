# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(1)) && $($(2))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $($(1)) && $($(2));
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
  const tmpCalleeParam$1 = $(2);
  tmpSwitchDisc = tmpCallCallee$1(tmpCalleeParam$1);
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
  const tmpCalleeParam$1 = $(2);
  $(tmpCalleeParam$1);
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
  const c = $( 2 );
  $( c );
}
$( 100 );
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
