# Preval test case

# sequence_ident.md

> Normalize > Member access > Statement > Func > Sequence ident
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  let b = "foo";
  ($(1), b).length;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = `foo`;
  ($(1), b).length;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = `foo`;
  $(1);
  const tmpCompObj = b;
  tmpCompObj.length;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
