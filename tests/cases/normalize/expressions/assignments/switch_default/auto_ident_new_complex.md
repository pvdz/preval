# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = new ($($))(1);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = new ($($))(1);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpNewCallee = $($);
a = new tmpNewCallee(1);
$(a);
`````

## Output


`````js filename=intro
$(1);
const tmpNewCallee = $($);
const a /*:object*/ = new tmpNewCallee(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( $ );
const b = new a( 1 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
