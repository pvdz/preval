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

## Pre Normal


`````js filename=intro
const wat = $(`xyz`);
const str = $coerce(wat, `plustr`);
const wat2 = $(`y`);
const s = $coerce(wat2, `plustr`);
const args = [s];
const res = str.split(args);
$(res);
`````

## Normalized


`````js filename=intro
const wat = $(`xyz`);
const str = $coerce(wat, `plustr`);
const wat2 = $(`y`);
const s = $coerce(wat2, `plustr`);
const args = [s];
const res = str.split(args);
$(res);
`````

## Output


`````js filename=intro
const wat /*:unknown*/ = $(`xyz`);
const str /*:string*/ = $coerce(wat, `plustr`);
const wat2 /*:unknown*/ = $(`y`);
const s /*:string*/ = $coerce(wat2, `plustr`);
const res /*:array*/ = str.split(s);
$(res);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "xyz" );
const b = $coerce( a, "plustr" );
const c = $( "y" );
const d = $coerce( c, "plustr" );
const e = b.split( d );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'xyz'
 - 2: 'y'
 - 3: ['x', 'z']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
