# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = b++;
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = b++;
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpPostUpdArgIdent = b;
b = b + 1;
a = tmpPostUpdArgIdent;
$(a, b);
`````

## Output


`````js filename=intro
$(1);
$(1, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 1, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
