# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = ~arg;
}
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = ~arg;
  } else {
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
a = ~arg;
$(a, arg);
`````

## Output


`````js filename=intro
$(1);
$(-2, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( -2, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
