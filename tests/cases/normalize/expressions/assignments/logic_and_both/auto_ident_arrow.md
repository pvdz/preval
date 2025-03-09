# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = () => {}) && (a = () => {}));
$(a);
`````

## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = function () {};
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = () => {
    debugger;
  }) &&
    (a = () => {
      debugger;
    }),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = function () {
    debugger;
    return undefined;
  };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
