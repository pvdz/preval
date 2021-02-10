# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
$(($(1), $(2))[$('toString')]);
$(c);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(1);
const tmpCompObj = $(2);
const tmpCompProp = $('toString');
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
$(c);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'toString'
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
