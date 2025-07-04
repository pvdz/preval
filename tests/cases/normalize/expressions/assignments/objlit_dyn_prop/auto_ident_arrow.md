# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Options

Ignoring function serialization errors

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = () => {})]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = { [a]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function $pcompiled() {};
$({ [a]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
const c = { [ a ]: 10 };
$( c );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {
  debugger;
  return undefined;
};
const tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
let tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
