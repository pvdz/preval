# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let b = "foo";
let c = 1;
$(($(1), b)[$('length')]);
$(c);
`````

## Normalized

`````js filename=intro
let b = 'foo';
let c = 1;
const tmpCallCallee = $;
$(1);
const tmpCompObj = b;
const tmpCompProp = $('length');
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
$(c);
`````

## Output

`````js filename=intro
let b = 'foo';
let c = 1;
$(1);
const tmpCompObj = b;
const tmpCompProp = $('length');
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
$(c);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'length'
 - 3: 3
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same