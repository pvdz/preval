# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ((a = b++)) {
  default:
    $(100);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = b++);
  if (true) {
    $(100);
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b + 1;
a = tmpPostUpdArgIdent;
let tmpSwitchDisc = a;
$(100);
$(a, b);
`````

## Output


`````js filename=intro
$(100);
$(1, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 1, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
