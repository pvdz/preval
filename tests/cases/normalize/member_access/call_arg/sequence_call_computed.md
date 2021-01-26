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
const tmpBindingInit = $(2);
const tmpCalleeParam = tmpBindingInit[$('toString')];
tmpCallCallee(tmpCalleeParam);
$(c);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
$(1);
const tmpBindingInit = $(2);
const tmpCalleeParam = tmpBindingInit[$('toString')];
tmpCallCallee(tmpCalleeParam);
$(c);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: "toString"
 - 3: null
 - 4: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
