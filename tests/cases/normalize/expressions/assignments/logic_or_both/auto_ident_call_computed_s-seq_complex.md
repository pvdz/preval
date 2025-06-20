# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$("$")](1)) || (a = (1, 2, b)[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const a /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpMCCP$1 /*:unknown*/ = $(`\$`);
  const tmpMCF$1 /*:unknown*/ = b[tmpMCCP$1];
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpMCF$1, b, undefined, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const b = { $: $ };
const a = b[tmpMCCP](1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpMCCP$1 = $(`\$`);
  const tmpNestedComplexRhs = b[tmpMCCP$1](1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
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
  $( d );
  $( d );
}
else {
  const e = $( "$" );
  const f = b[ e ];
  const g = $dotCall( f, b, undefined, 1 );
  $( g );
  $( g );
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
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpMCCO$1 = b;
  const tmpMCCP$1 = $(`\$`);
  const tmpMCF$1 = tmpMCCO$1[tmpMCCP$1];
  const tmpNestedComplexRhs = $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
