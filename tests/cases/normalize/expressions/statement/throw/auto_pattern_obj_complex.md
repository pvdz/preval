# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Throw > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
throw $({ a: 1, b: 2 });
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpThrowArg /*:unknown*/ = $(tmpCalleeParam);
throw tmpThrowArg;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $({ a: 1, b: 2 });
throw tmpThrowArg;
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
throw $({ a: 1, b: 2 });
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpThrowArg = $(tmpCalleeParam);
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
throw b;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
