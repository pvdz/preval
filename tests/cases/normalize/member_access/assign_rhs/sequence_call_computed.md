# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let x = 10;
x = ($(1), $(2))[$('toString')];
$(x);
$(c);
`````

## Normalized

`````js filename=intro
let x = 10;
$(1);
const tmpAssignRhsCompObj = $(2);
const tmpAssignRhsCompProp = $('toString');
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
$(c);
`````

## Output

`````js filename=intro
let x = 10;
$(1);
const tmpAssignRhsCompObj = $(2);
const tmpAssignRhsCompProp = $('toString');
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
$(c);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'toString'
 - 4: 'function'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same