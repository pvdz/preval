# Preval test case

# ident_spread.md

> Normalize > Object > Dupe props > Ident spread
>
> Duplicate properties are legal but useless. We should get rid of them.

## Input

`````js filename=intro
const x = {a: $('prop'), ...$({})};
$(x);
`````

## Pre Normal


`````js filename=intro
const x = { a: $(`prop`), ...$({}) };
$(x);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = $(`prop`);
const tmpCallCallee = $;
const tmpCalleeParam = {};
const tmpObjSpread = tmpCallCallee(tmpCalleeParam);
const x = { a: tmpObjLitVal, ...tmpObjSpread };
$(x);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(`prop`);
const tmpCalleeParam = {};
const tmpObjSpread = $(tmpCalleeParam);
const x = { a: tmpObjLitVal, ...tmpObjSpread };
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "prop" );
const b = {};
const c = $( b );
const d = {
  a: a,
  ... c,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'prop'
 - 2: {}
 - 3: { a: '"prop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
