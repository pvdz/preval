# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function () {}) || (a = function () {}));
$(a);
`````

## Settled


`````js filename=intro
let a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs /*:()=>undefined*/ = function () {
    debugger;
    return undefined;
  };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = function () {};
if (a) {
  $(a);
} else {
  const tmpNestedComplexRhs = function () {};
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = function () {
    debugger;
  }) ||
    (a = function () {
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
} else {
  const tmpNestedComplexRhs = function () {
    debugger;
    return undefined;
  };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  return undefined;
};
if (a) {
  $( a );
}
else {
  const b = function() {
    debugger;
    return undefined;
  };
  a = b;
  $( b );
}
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
