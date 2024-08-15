# Preval test case

# missing_method3.md

> Object literal > Static prop lookups > Missing method3
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  valueOf(){ return 'xyz'; },
};
$(o.toString());
`````

## Pre Normal


`````js filename=intro
const o = {
  valueOf() {
    debugger;
    return `xyz`;
  },
};
$(o.toString());
`````

## Normalized


`````js filename=intro
const o = {
  valueOf() {
    debugger;
    return `xyz`;
  },
};
const tmpCallCallee = $;
const tmpCalleeParam = o.toString();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $ObjectPrototype.toString();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.toString();
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '[object Object]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
