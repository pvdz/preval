# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Tagged > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = () => {})} after`;
$(a);
`````

## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
$([`before `, ` after`], a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  [`before `, ` after`],
  (a = () => {
    debugger;
  }),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
a = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = [ "before ", " after" ];
$( b, a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['before ', ' after'], '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
