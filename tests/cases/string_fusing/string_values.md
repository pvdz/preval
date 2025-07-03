# Preval test case

# string_values.md

> String fusing > String values
>
> Two non-constant templates should be fused together

## Input

`````js filename=intro
const a = String($('a'));
const b = String($('a'));
const c = a + b; // This should melt into a template, too
$(c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`a`);
const a /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpCalleeParam$1 /*:unknown*/ = $(`a`);
const b /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const c /*:string*/ = `${a}${b}`;
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = String($(`a`));
const b = String($(`a`));
$(`${a}${b}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $coerce( a, "string" );
const c = $( "a" );
const d = $coerce( c, "string" );
const e = `${b}${d}`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`a`);
const a = $coerce(tmpCalleeParam, `string`);
let tmpCalleeParam$1 = $(`a`);
const b = $coerce(tmpCalleeParam$1, `string`);
const c = a + b;
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'aa'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
