# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(1)) && 2) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $($(1)) && 2;
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
  tmpSwitchDisc = 2;
} else {
}
$(100);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
$(tmpCalleeParam);
$(100);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
$( 100 );
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
