# Preval test case

# string_primitive_with_unknown.md

> String fusing > Ai > String primitive with unknown
>
> Test concatenation of string primitive with unknown type variable

## Input

`````js filename=intro
const unknown = $("test");
const result = "hello" + unknown;
$(result);
`````


## Settled


`````js filename=intro
const unknown /*:unknown*/ = $(`test`);
const tmpStringConcatL /*:string*/ = $coerce(unknown, `plustr`);
const result /*:string*/ /*truthy*/ = `hello${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $(`test`) + ``;
$(`hello${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = $coerce( a, "plustr" );
const c = `hello${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const unknown = $(`test`);
const tmpStringConcatL = $coerce(unknown, `plustr`);
const result = `hello${tmpStringConcatL}`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'hellotest'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
