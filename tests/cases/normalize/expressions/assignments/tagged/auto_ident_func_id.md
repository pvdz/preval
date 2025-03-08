# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Tagged > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = function f() {})} after`;
$(a);
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, f);
$(f);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {};
$([`before `, ` after`], f);
$(f);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  [`before `, ` after`],
  (a = function f() {
    debugger;
  }),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const f = function () {
  debugger;
  return undefined;
};
a = f;
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
