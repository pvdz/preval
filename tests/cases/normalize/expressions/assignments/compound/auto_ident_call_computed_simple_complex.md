# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a *= b[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const tmpBinBothRhs /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const b = { $: $ };
const tmpBinBothRhs = b[tmpMCCP](1);
const tmpClusterSSA_a = { a: 999, b: 1000 } * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
const e = {
  a: 999,
  b: 1000,
};
const f = e * d;
$( f );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpMCCO = b;
const tmpMCCP = $(`\$`);
const tmpMCF = tmpMCCO[tmpMCCP];
const tmpBinBothRhs = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
