# Preval test case

# simple_computed_call.md

> Normalize > Member access > Call arg > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj[$('foo')]);
`````

## Pre Normal


`````js filename=intro
const obj = { foo: 10 };
$(obj[$(`foo`)]);
`````

## Normalized


`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = $(`foo`);
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`foo`);
const obj /*:object*/ = { foo: 10 };
const tmpCalleeParam /*:unknown*/ = obj[tmpCompProp];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "foo" );
const b = { foo: 10 };
const c = b[ a ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
