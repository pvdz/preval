# Preval test case

# complex_computed_property.md

> Normalize > Call > Complex computed property
>
> Calls should have simple objects

## Input

`````js filename=intro
function b() { return $('b'); }
const a = {b: $};
$(a)[b()](1);
`````

## Pre Normal


`````js filename=intro
let b = function () {
  debugger;
  return $(`b`);
};
const a = { b: $ };
$(a)[b()](1);
`````

## Normalized


`````js filename=intro
let b = function () {
  debugger;
  const tmpReturnArg = $(`b`);
  return tmpReturnArg;
};
const a = { b: $ };
const tmpCallCompObj = $(a);
const tmpCallCompProp = b();
tmpCallCompObj[tmpCallCompProp](1);
`````

## Output


`````js filename=intro
const a /*:object*/ = { b: $ };
const tmpCallCompObj /*:unknown*/ = $(a);
const tmpCallCompProp /*:unknown*/ = $(`b`);
tmpCallCompObj[tmpCallCompProp](1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = $( "b" );
b[ c ]( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 'b'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
