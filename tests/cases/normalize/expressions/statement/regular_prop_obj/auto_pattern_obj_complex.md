# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let obj = {};
$({ a: 1, b: 2 }).a;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpCompObj /*:unknown*/ = $(tmpCalleeParam);
tmpCompObj.a;
$(999);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 1, b: 2 }).a;
$(999);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
let obj = {};
$({ a: 1, b: 2 }).a;
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let obj = {};
const tmpCalleeParam = { a: 1, b: 2 };
const tmpCompObj = $(tmpCalleeParam);
tmpCompObj.a;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
b.a;
$( 999 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
