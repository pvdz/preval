# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = () => {}).a;
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
a.a;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
a.a;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
a.a;
$( a );
`````


## Todos triggered


None


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
