# Preval test case

# sequence_ident.md

> Normalize > Member access > Call arg > Sequence ident
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let b = "foo";
$(($(1), b).length);
`````

## Pre Normal

`````js filename=intro
let b = `foo`;
$(($(1), b).length);
`````

## Normalized

`````js filename=intro
let b = `foo`;
const tmpCallCallee = $;
$(1);
const tmpCompObj = b;
const tmpCalleeParam = tmpCompObj.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
