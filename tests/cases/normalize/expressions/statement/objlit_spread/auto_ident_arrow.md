# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...() => {} });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({
  ...() => {
    debugger;
  },
});
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjSpreadArg = function () {
  debugger;
  return undefined;
};
({ ...tmpObjSpreadArg });
$(a);
`````

## Output


`````js filename=intro
const tmpObjSpreadArg = function () {
  debugger;
  return undefined;
};
({ ...tmpObjSpreadArg });
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
{ ... a };
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
