# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = void $(100))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = void $(100));
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
$(100);
a = undefined;
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output


`````js filename=intro
$(100);
$(100);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
