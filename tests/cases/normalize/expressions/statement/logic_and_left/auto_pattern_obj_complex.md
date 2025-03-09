# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Logic and left > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ a: 1, b: 2 }) && $(100);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  $(100);
  $(999);
} else {
  $(999);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($({ a: 1, b: 2 })) {
  $(100);
  $(999);
} else {
  $(999);
}
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$({ a: 1, b: 2 }) && $(100);
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
if (b) {
  $( 100 );
  $( 999 );
}
else {
  $( 999 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 100
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
