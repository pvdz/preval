# Preval test case

# auto_ident_tagged_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident tagged complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = $`foo${$(1)}`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $([`foo`, ``], $(1));
$(a);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [`foo`, ``];
const tmpCalleeParam$1 = $(1);
let a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam = [`foo`, ``];
const a = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ "foo", "" ];
const c = $( b, a );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['foo', ''], 1
 - 3: ['foo', '']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
