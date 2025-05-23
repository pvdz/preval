# Preval test case

# var_logical_and_eq_const.md

> Logical > Compound > Ident > Var > Var logical and eq const
>
>

## Input

`````js filename=intro
const a = $spy('a');
const c = a &&= $('b');
$(c);
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $spy(`a`);
if (c) {
  $(`b`);
  throw `Preval: Assignment to constant variable: \`a = tmpNestedComplexRhs;\``;
} else {
  $(c);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $spy(`a`);
if (c) {
  $(`b`);
  throw `Preval: Assignment to constant variable: \`a = tmpNestedComplexRhs;\``;
} else {
  $(c);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
if (a) {
  $( "b" );
  throw "Preval: Assignment to constant variable: `a = tmpNestedComplexRhs;`";
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $spy(`a`);
let c = a;
if (c) {
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
 - 2: 'b'
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
