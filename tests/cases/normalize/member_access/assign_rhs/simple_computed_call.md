# Preval test case

# simple_computed_call.md

> Normalize > Member access > Assign rhs > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
let x = 10;
x = obj[$('foo')];
$(x);
`````

## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`foo`);
const obj /*:object*/ = { foo: 10 };
const x /*:unknown*/ = obj[tmpAssignRhsCompProp];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompProp = $(`foo`);
$({ foo: 10 }[tmpAssignRhsCompProp]);
`````

## Pre Normal


`````js filename=intro
const obj = { foo: 10 };
let x = 10;
x = obj[$(`foo`)];
$(x);
`````

## Normalized


`````js filename=intro
const obj = { foo: 10 };
let x = 10;
const tmpAssignRhsCompObj = obj;
const tmpAssignRhsCompProp = $(`foo`);
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
const b = { foo: 10 };
const c = b[ a ];
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
