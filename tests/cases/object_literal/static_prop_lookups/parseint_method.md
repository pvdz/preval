# Preval test case

# parseint_method.md

> Object literal > Static prop lookups > Parseint method
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {
  f: parseInt,
};
$(o.f("200", 15));
`````

## Pre Normal


`````js filename=intro
const o = { f: parseInt };
$(o.f(`200`, 15));
`````

## Normalized


`````js filename=intro
const o = { f: parseInt };
const tmpCallCallee = $;
const tmpCalleeParam = o.f(`200`, 15);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const o = { f: parseInt };
const tmpCalleeParam = o.f(`200`, 15);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { f: parseInt };
const b = a.f( "200", 15 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 450
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
