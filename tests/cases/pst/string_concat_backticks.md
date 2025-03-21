# Preval test case

# string_concat_backticks.md

> Pst > String concat backticks

## Input

`````js filename=intro
const here = $("here")
$("this `thing`" + here + "is `quoted`");
`````


## Settled


`````js filename=intro
const here /*:unknown*/ = $(`here`);
const tmpStringConcatL /*:string*/ = $coerce(here, `plustr`);
const tmpCalleeParam /*:string*/ = `this \`thing\`${tmpStringConcatL}is \`quoted\``;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $coerce($(`here`), `plustr`);
$(`this \`thing\`${tmpStringConcatL}is \`quoted\``);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "here" );
const b = $coerce( a, "plustr" );
const c = `this \`thing\`${b}is \`quoted\``;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'here'
 - 2: 'this `thing`hereis `quoted`'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
