# Preval test case

# ident_member_sequence_simple.md

> Normalize > Binding > Stmt-func-top > Ident member sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = (b.x, c).foo;
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $Number_prototype.foo;
const b /*:object*/ = { x: 2 };
$(a, b, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_prototype.foo, { x: 2 }, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.foo;
const b = { x: 2 };
$( a, b, 3 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, { x: '2' }, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
