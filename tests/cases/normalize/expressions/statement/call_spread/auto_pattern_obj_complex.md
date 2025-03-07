# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Call spread > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(...$({ a: 1, b: 2 }));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
$(...tmpCalleeParamSpread);
$(999);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParamSpread = $({ a: 1, b: 2 });
$(...tmpCalleeParamSpread);
$(999);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(...$({ a: 1, b: 2 }));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpCalleeParamSpread = $(tmpCalleeParam);
$(...tmpCalleeParamSpread);
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
$( ...b );
$( 999 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
