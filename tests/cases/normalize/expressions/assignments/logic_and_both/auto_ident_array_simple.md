# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) && (a = [1, 2, 3]));
$(a);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:array*/ /*truthy*/ = [1, 2, 3];
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedComplexRhs = [1, 2, 3];
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = [1, 2, 3];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
