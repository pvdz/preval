# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Ternary c > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(0) ? $(100) : $({ a: 1, b: 2 });
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  $(tmpCalleeParam);
}
$(999);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(100);
} else {
  $({ a: 1, b: 2 });
}
$(999);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(0) ? $(100) : $({ a: 1, b: 2 });
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpCalleeParam = { a: 1, b: 2 };
  $(tmpCalleeParam);
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 100 );
}
else {
  const b = {
    a: 1,
    b: 2,
  };
  $( b );
}
$( 999 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
