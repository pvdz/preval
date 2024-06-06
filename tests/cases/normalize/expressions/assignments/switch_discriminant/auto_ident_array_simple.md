# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = [1, 2, 3])) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = [1, 2, 3]);
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
a = [1, 2, 3];
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output


`````js filename=intro
$(100);
const a = [1, 2, 3];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
