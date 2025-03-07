# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) || (a = /foo/));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = /foo/;
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs /*:regex*/ = /foo/;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = /foo/;
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs = /foo/;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) || (a = /foo/));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = /foo/;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = /foo/;
if (a) {
  $( a );
}
else {
  const b = /foo/;
  a = b;
  $( b );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
