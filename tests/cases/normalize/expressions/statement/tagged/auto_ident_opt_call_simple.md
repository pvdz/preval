# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$?.(1)} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
  $(a);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  $(tmpCalleeParam, tmpChainElementCall);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $ == null;
const tmpCalleeParam = [`before `, ` after`];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
  $(a);
} else {
  $(tmpCalleeParam, $(1));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
const b = [ "before ", " after" ];
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b, undefined );
  $( c );
}
else {
  const d = $( 1 );
  $( b, d );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpCalleeParam$1 = tmpChainElementCall;
  $(tmpCalleeParam, tmpChainElementCall);
  $(a);
} else {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
