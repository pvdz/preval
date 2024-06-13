# Preval test case

# auto_ident_template_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident template complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = `foo${$(1)}`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = `foo` + $coerce($(1), `string`) + ``;
$(a);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = `foo`;
const tmpCallCallee = $(1);
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let a = $coerce(tmpBinLhs, `plustr`);
$(a);
`````

## Output


`````js filename=intro
const tmpCallCallee = $(1);
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
const tmpBinLhs = `foo${tmpBinBothRhs}`;
$(tmpBinLhs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `foo${tmpBinBothRhs}`;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'foo1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
