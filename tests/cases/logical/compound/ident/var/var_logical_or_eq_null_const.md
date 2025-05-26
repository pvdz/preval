# Preval test case

# var_logical_or_eq_null_const.md

> Logical > Compound > Ident > Var > Var logical or eq null const
>
>

## Input

`````js filename=intro
const a = $(null);
const c = a ||= $('b');
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(null);
const tmpIfTest /*:boolean*/ = a == null;
if (tmpIfTest) {
  $(`b`);
  throw `Preval: Cannot write to const binding \`a\``;
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(null);
if (a == null) {
  $(`b`);
  throw `Preval: Cannot write to const binding \`a\``;
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( null );
const b = a == null;
if (b) {
  $( "b" );
  throw "Preval: Cannot write to const binding `a`";
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(null);
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
 - 1: null
 - 2: 'b'
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
