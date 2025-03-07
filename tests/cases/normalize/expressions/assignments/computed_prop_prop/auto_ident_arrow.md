# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = () => {})];
$(a);
`````

## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const obj /*:object*/ = {};
obj[a];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
({}[a]);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[
  (a = () => {
    debugger;
  })
];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = function () {
  debugger;
  return undefined;
};
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = {};
b[ a ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
