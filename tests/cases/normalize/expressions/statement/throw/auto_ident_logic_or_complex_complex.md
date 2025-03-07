# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(0)) || $($(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpThrowArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpThrowArg) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpThrowArg = $(tmpCalleeParam$1);
}
throw tmpThrowArg;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = $($(0));
if (!tmpThrowArg) {
  tmpThrowArg = $($(2));
}
throw tmpThrowArg;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(0)) || $($(2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpThrowArg = $(tmpCalleeParam);
if (tmpThrowArg) {
} else {
  const tmpCalleeParam$1 = $(2);
  tmpThrowArg = $(tmpCalleeParam$1);
}
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 2 );
  b = $( c );
}
throw b;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
