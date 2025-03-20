# Preval test case

# string_split_arr_with_string.md

> Type tracked > String method > String split arr with string
>
> webassembly bootstrap js1k: https://wasmgroundup.com/blog/wasm-compiler-in-a-tweet/

## Input

`````js filename=intro
const wat /*:unknown*/ = $(`x`);
const str /*:string*/ = $coerce(wat, `plustr`);
const args /*:array*/ = [` `];
const res /*:array*/ = str.split(args);
$(res);
`````


## Settled


`````js filename=intro
const wat /*:unknown*/ = $(`x`);
const str /*:string*/ = $coerce(wat, `plustr`);
const res /*:array*/ = str.split(` `);
$(res);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(`x`), `plustr`).split(` `));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = $coerce( a, "plustr" );
const c = b.split( " " );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: ['x']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
