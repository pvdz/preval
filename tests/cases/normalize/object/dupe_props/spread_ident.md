# Preval test case

# spread_ident.md

> Normalize > Object > Dupe props > Spread ident
>
> Duplicate properties are legal but useless. We should get rid of them.

#TODO

## Input

`````js filename=intro
const x = {...$({a: 'ignored'}), a: $('prop')};
$(x);
`````

## Pre Normal

`````js filename=intro
const x = { ...$({ a: `ignored` }), a: $(`prop`) };
$(x);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = { a: `ignored` };
const tmpObjSpread = tmpCallCallee(tmpCalleeParam);
const tmpObjLitVal = $(`prop`);
const x = { ...tmpObjSpread, a: tmpObjLitVal };
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { a: `ignored` };
const tmpObjSpread = $(tmpCalleeParam);
const tmpObjLitVal = $(`prop`);
const x = { ...tmpObjSpread, a: tmpObjLitVal };
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { a: "ignored" };
const b = $( a );
const c = $( "prop" );
const d = {
... b,
a: c
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"ignored"' }
 - 2: 'prop'
 - 3: { a: '"prop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
