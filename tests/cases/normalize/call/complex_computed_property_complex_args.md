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
const a /*:object*/ = { b: $ };
const tmpCallCompObj /*:unknown*/ = $(a);
const tmpCallCompProp /*:unknown*/ = $(`b`);
const tmpCallCompVal /*:unknown*/ = tmpCallCompObj[tmpCallCompProp];
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
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

Inverse input result (there was at least one mismatch even though actual test evalled equal):
 - 1: { b: '"<$>"' }
 - 2: ''
 - 3: 0
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalization inverse calls: BAD!?
 - 1: { b: '"<$>"' }
 - 2: 'b'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - eval returned: undefined

Output inverse calls: BAD!!
 - 1: { b: '"<$>"' }
 - 2: ''
 - 3: 0
 - 4: 2
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')



Denormalized inverse calls: BAD!!
 - 1: { b: '"<$>"' }
 - 2: ''
 - 3: 0
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
