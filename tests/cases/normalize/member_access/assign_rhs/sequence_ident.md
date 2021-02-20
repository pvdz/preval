# Preval test case

# sequence_ident.md

> Normalize > Member access > Assign rhs > Sequence ident
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
let x = 10, b = "foo";
x = ($(1), b).length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
let b = 'foo';
$(1);
const tmpAssignRhsProp = b;
x = tmpAssignRhsProp.length;
$(x);
`````

## Output

`````js filename=intro
$(1);
const SSA_x = 'foo'.length;
$(SSA_x);
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
