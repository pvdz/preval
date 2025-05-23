# Preval test case

# var_logical_or_eq.md

> Logical > Compound > Ident > Var > Var logical or eq
>
>

## Input

`````js filename=intro
let a = $spy('a');
const c = a ||= $('b');
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $spy(`a`);
const tmpIfTest /*:boolean*/ = a == null;
if (tmpIfTest) {
  const tmpNestedComplexRhs /*:unknown*/ = $(`b`);
  $(tmpNestedComplexRhs);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $spy(`a`);
if (a == null) {
  $($(`b`));
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = a == null;
if (b) {
  const c = $( "b" );
  $( c );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = $spy(`a`);
let c = a;
const tmpIfTest = c == null;
if (tmpIfTest) {
  const tmpNestedComplexRhs = $(`b`);
  a = tmpNestedComplexRhs;
  c = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(c);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: '<spy[1]>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
