# Preval test case

# destruct_keys_string.md

> Normalize > Pattern > Destruct keys string

## Input

`````js filename=intro
const x = {"a b": 3};
let {
  "a b": c, // this means `var c = x["a b"]`
} = x;
$(c);
`````

## Pre Normal


`````js filename=intro
const x = { [`a b`]: 3 };
let { [`a b`]: c } = x;
$(c);
`````

## Normalized


`````js filename=intro
const x = { [`a b`]: 3 };
let bindingPatternObjRoot = x;
let dynKey = `a b`;
let c = bindingPatternObjRoot[dynKey];
$(c);
`````

## Output


`````js filename=intro
const x /*:object*/ = { [`a b`]: 3 };
const c = x[`a b`];
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { [ "a b" ]: 3 };
const b = a[ "a b" ];
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
