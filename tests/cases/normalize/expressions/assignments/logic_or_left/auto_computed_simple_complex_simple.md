# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Logic or left > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) || $(100));
a[$("b")] = 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
$(a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
a[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$(a);
const tmpAssignComMemLhsProp = $(`b`);
a[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( b );
const c = $( "b" );
b[c] = 2;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
}
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 'b'
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
