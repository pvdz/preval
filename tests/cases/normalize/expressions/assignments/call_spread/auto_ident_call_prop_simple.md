# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident call prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(...(a = b.$(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(...(a = b.$(1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = b.$(1);
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = b.$(1);
$(...a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
$( ... b );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
