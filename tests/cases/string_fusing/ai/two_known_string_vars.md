# Preval test case

# two_known_string_vars.md

> String fusing > Ai > Two known string vars
>
> Test concatenation of two variables known to be strings

## Input

`````js filename=intro
const str1 = String($("hello"));
const str2 = String($("world"));
const result = str1 + str2;
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`hello`);
const str1 /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpCalleeParam$1 /*:unknown*/ = $(`world`);
const str2 /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const result /*:string*/ = `${str1}${str2}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str1 = String($(`hello`));
const str2 = String($(`world`));
$(`${str1}${str2}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $coerce( a, "string" );
const c = $( "world" );
const d = $coerce( c, "string" );
const e = `${b}${d}`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`hello`);
const str1 = $coerce(tmpCalleeParam, `string`);
let tmpCalleeParam$1 = $(`world`);
const str2 = $coerce(tmpCalleeParam$1, `string`);
const result = str1 + str2;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'world'
 - 3: 'helloworld'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
