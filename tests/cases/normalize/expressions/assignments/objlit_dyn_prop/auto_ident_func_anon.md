# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = function () {})]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:object*/ = { [a]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
$({ [a]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = { [ a ]: 10 };
$( b );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 'function() {return undefined;}': '10' }
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - 1: { 'function() {\ndebugger;\nreturn undefined;\n}': '10' }
 - 2: '<function>'
 - eval returned: undefined

Post settled calls: BAD!!
 - 1: { 'function() {\ndebugger;\nreturn undefined;\n}': '10' }
 - 2: '<function>'
 - eval returned: undefined

Denormalized calls: Same
