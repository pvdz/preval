# Preval test case

# string_concat_single_quote.md

> Pst > String concat single quote

## Input

`````js filename=intro
const here = $("here")
$("this 'thing'" + here + "is 'quoted'");
`````


## Settled


`````js filename=intro
const here /*:unknown*/ = $(`here`);
const tmpStringConcatL /*:string*/ = $coerce(here, `plustr`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `this 'thing'${tmpStringConcatL}is 'quoted'`;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $coerce($(`here`), `plustr`);
$(`this 'thing'${tmpStringConcatL}is 'quoted'`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "here" );
const b = $coerce( a, "plustr" );
const c = `this 'thing'${b}is 'quoted'`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const here = $(`here`);
const tmpStringConcatL = $coerce(here, `plustr`);
const tmpBinLhs = `this 'thing'${tmpStringConcatL}`;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}is 'quoted'`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'here'
 - 2: "this 'thing'hereis 'quoted'"
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
