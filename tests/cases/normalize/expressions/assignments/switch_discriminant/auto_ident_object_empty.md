# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = {})) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = {});
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
a = {};
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output

`````js filename=intro
$(100);
const a = {};
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = {};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
