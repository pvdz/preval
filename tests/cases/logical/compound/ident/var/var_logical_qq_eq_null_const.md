# Preval test case

# var_logical_qq_eq_null_const.md

> Logical > Compound > Ident > Var > Var logical qq eq null const
>
>

## Input

`````js filename=intro
const a = $(null);
const c = a ??= $('b');
$(c);
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(null);
const tmpIfTest /*:boolean*/ = c == null;
if (tmpIfTest) {
  $(`b`);
  throw `Preval: Assignment to constant variable: \`a = tmpNestedComplexRhs;\``;
} else {
  $(c);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(null);
if (c == null) {
  $(`b`);
  throw `Preval: Assignment to constant variable: \`a = tmpNestedComplexRhs;\``;
} else {
  $(c);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( null );
const b = a == null;
if (b) {
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
