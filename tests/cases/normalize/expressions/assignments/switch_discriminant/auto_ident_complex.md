# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ((a = $(b))) {
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
  const tmpSwitchDisc = (a = $(b));
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
a = $(b);
let tmpSwitchDisc = a;
$(100);
$(a, b);
`````

## Output


`````js filename=intro
const a = $(1);
$(100);
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( 100 );
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
