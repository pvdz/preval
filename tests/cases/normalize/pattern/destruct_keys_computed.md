# Preval test case

# destruct_keys_computed.md

> Normalize > Pattern > Destruct keys computed
>
> Thanks, obfuscation. This caused a TODO crash.

## Input

`````js filename=intro
const a = $('a');
const b = $('b');
const x = {ab: 3};
let {
  [a + b]: c, // this means `var c = x[a+b]`
} = x;
$(c);
`````

## Pre Normal


`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const x = { ab: 3 };
let { [a + b]: c } = x;
$(c);
`````

## Normalized


`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const x = { ab: 3 };
let bindingPatternObjRoot = x;
let dynKey = a + b;
let c = bindingPatternObjRoot[dynKey];
$(c);
`````

## Output


`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const dynKey /*:primitive*/ = a + b;
const x /*:object*/ = { ab: 3 };
const c = x[dynKey];
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = a + b;
const d = { ab: 3 };
const e = d[ c ];
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
