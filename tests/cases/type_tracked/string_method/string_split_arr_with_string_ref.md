# Preval test case

# string_split_arr_with_string_ref.md

> Type tracked > String method > String split arr with string ref
>
> webassembly bootstrap js1k: https://wasmgroundup.com/blog/wasm-compiler-in-a-tweet/

## Input

`````js filename=intro
const wat /*:unknown*/ = $(`xyz`);
const str /*:string*/ = $coerce(wat, `plustr`);
const wat2 = $('y');
const s = $coerce(wat2, `plustr`);;
const args /*:array*/ = [s];
const res /*:array*/ = str.split(args);
$(res);
`````


## Settled


`````js filename=intro
const wat /*:unknown*/ = $(`xyz`);
const str /*:string*/ = $coerce(wat, `plustr`);
const wat2 /*:unknown*/ = $(`y`);
const s /*:string*/ = $coerce(wat2, `plustr`);
const res /*:array*/ /*truthy*/ = $dotCall($string_split, str, `split`, s);
$(res);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`xyz`) + ``;
$($dotCall($string_split, str, `split`, $(`y`) + ``));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "xyz" );
const b = $coerce( a, "plustr" );
const c = $( "y" );
const d = $coerce( c, "plustr" );
const e = $dotCall( $string_split, b, "split", d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const wat = $(`xyz`);
const str = $coerce(wat, `plustr`);
const wat2 = $(`y`);
const s = $coerce(wat2, `plustr`);
const args = [s];
const tmpMCF = str.split;
const res = $dotCall(tmpMCF, str, `split`, args);
$(res);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'xyz'
 - 2: 'y'
 - 3: ['x', 'z']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
