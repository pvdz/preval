# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let b = "foo";
let x = ($(1), b).length;
$(x);
`````

## Normalized

`````js filename=intro
let b = 'foo';
$(1);
const tmpCompObj = b;
let x = tmpCompObj.length;
$(x);
`````

## Output

`````js filename=intro
$(1);
const x = 'foo'.length;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
