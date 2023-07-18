# Preval test case

# sequence_call_computed.md

> Normalize > Member access > Call arg > Sequence call computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
$(($(1), $(2))[$('toString')]);
$(c);
`````

## Pre Normal

`````js filename=intro
$(($(1), $(2))[$(`toString`)]);
$(c);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(1);
const tmpCompObj = $(2);
const tmpCompProp = $(`toString`);
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
$(c);
`````

## Output

`````js filename=intro
$(1);
const tmpCompObj = $(2);
const tmpCompProp = $(`toString`);
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = $( "toString" );
const c = a[ b ];
$( c );
$( c );
`````

## Globals

BAD@! Found 1 implicit global bindings:

c

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'toString'
 - 4: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
