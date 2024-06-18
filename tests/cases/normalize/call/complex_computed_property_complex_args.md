# Preval test case

# complex_computed_property_complex_args.md

> Normalize > Call > Complex computed property complex args
>
> Calls should have simple objects

## Input

`````js filename=intro
function b() { return $('b'); }
const a = {b: $};
$(a)[b()]($(1), $(2));
`````

## Pre Normal


`````js filename=intro
let b = function () {
  debugger;
  return $(`b`);
};
const a = { b: $ };
$(a)[b()]($(1), $(2));
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
const tmpCallCompVal = tmpCallCompObj[tmpCallCompProp];
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$dotCall(tmpCallCompVal, tmpCallCompObj, tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const a = { b: $ };
const tmpCallCompObj = $(a);
const tmpCallCompProp = $(`b`);
const tmpCallCompVal = tmpCallCompObj[tmpCallCompProp];
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$dotCall(tmpCallCompVal, tmpCallCompObj, tmpCalleeParam, tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = $( "b" );
const d = b[ c ];
const e = $( 1 );
const f = $( 2 );
$dotCall( d, b, e, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 'b'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
