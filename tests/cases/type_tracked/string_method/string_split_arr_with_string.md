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

## Pre Normal


`````js filename=intro
const wat = $(`x`);
const str = $coerce(wat, `plustr`);
const args = [` `];
const res = str.split(args);
$(res);
`````

## Normalized


`````js filename=intro
const wat = $(`x`);
const str = $coerce(wat, `plustr`);
const args = [` `];
const res = str.split(args);
$(res);
`````

## Output


`````js filename=intro
const wat /*:unknown*/ = $(`x`);
const str /*:string*/ = $coerce(wat, `plustr`);
const res /*:array*/ = str.split(` `);
$(res);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "x" );
const b = $coerce( a, "plustr" );
const c = b.split( " " );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: ['x']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
