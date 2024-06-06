# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = "foo")) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = `foo`);
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
a = `foo`;
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output


`````js filename=intro
$(100);
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
