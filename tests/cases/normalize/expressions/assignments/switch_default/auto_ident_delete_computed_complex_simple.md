# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = delete $(arg)["y"];
}
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = delete $(arg)[`y`];
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
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
$(a, arg);
`````

## Output

`````js filename=intro
$(1);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpSSA_a = delete tmpDeleteObj.y;
$(tmpSSA_a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = { y: 1 };
const b = $( a );
const c = deleteb.y;
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { y: '1' }
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
