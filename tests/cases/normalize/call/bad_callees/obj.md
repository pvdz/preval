# Preval test case

# obj.md

> Normalize > Call > Bad callees > Obj
>
> Certain values can be statically determined to trigger a runtime error when they're called

## Input

`````js filename=intro
$('before');
({a: 1, b: 2}());
$('after');
`````


## Settled


`````js filename=intro
$(`before`);
const tmpCallComplexCallee /*:object*/ = { a: 1, b: 2 };
tmpCallComplexCallee();
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
const tmpCallComplexCallee = { a: 1, b: 2 };
tmpCallComplexCallee();
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before" );
const a = {
  a: 1,
  b: 2,
};
a();
$( "after" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
