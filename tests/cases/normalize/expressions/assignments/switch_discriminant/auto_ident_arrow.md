# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = () => {})) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = () => {
    debugger;
  });
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
a = function () {
  debugger;
  return undefined;
};
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output


`````js filename=intro
const a = function () {
  debugger;
  return undefined;
};
$(100);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( 100 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
