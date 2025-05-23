# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = b[$("$")](1)) && (a = b[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const a /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
if (a) {
  const tmpMCCP$1 /*:unknown*/ = $(`\$`);
  const tmpMCF$1 /*:unknown*/ = b[tmpMCCP$1];
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpMCF$1, b, undefined, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const b = { $: $ };
const a = b[tmpMCCP](1);
if (a) {
  const tmpMCCP$1 = $(`\$`);
  const tmpNestedComplexRhs = b[tmpMCCP$1](1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
if (d) {
  const e = $( "$" );
  const f = b[ e ];
  const g = $dotCall( f, b, undefined, 1 );
  $( g );
  $( g );
}
else {
  $( d );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpMCCO = b;
const tmpMCCP = $(`\$`);
const tmpMCF = tmpMCCO[tmpMCCP];
a = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpMCCO$1 = b;
  const tmpMCCP$1 = $(`\$`);
  const tmpMCF$1 = tmpMCCO$1[tmpMCCP$1];
  const tmpNestedComplexRhs = $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
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


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
