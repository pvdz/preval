# Preval test case

# missing_method.md

> Object literal > Static prop lookups > Missing method
>
> If we can statically resolve a property lookup, we should

#TODO

## Input

`````js filename=intro
const o = {
  
};
$(o.toString());
`````

## Pre Normal

`````js filename=intro
const o = {};
$(o.toString());
`````

## Normalized

`````js filename=intro
const o = {};
const tmpCallCallee = $;
const tmpCalleeParam = o.toString();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjectMethod = $ObjectPrototype.toString;
const o = {};
const tmpCalleeParam = $dotCall(tmpObjectMethod, o);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.toString;
const b = {};
const c = $dotCall( a, b );
$( c );
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
