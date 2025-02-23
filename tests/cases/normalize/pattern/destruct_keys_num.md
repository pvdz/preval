# Preval test case

# destruct_keys_num.md

> Normalize > Pattern > Destruct keys num

## Input

`````js filename=intro
const x = {200: 3};
let {
  200: c, // this means `var c = x[200]`
} = x;
$(c);
`````

## Pre Normal


`````js filename=intro
const x = { [200]: 3 };
let { [200]: c } = x;
$(c);
`````

## Normalized


`````js filename=intro
const x = { [200]: 3 };
let bindingPatternObjRoot = x;
let dynKey = 200;
let c = bindingPatternObjRoot[dynKey];
$(c);
`````

## Output


`````js filename=intro
const x /*:object*/ = { [200]: 3 };
const c /*:unknown*/ = x[200];
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { [ 200 ]: 3 };
const b = a[ 200 ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
